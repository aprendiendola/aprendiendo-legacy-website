import React, { Component, Fragment } from "react";
import Vimeo from "@vimeo/player";
import io from "socket.io-client";
import PropTypes from "prop-types";
import UAParser from "ua-parser-js";
import facebookPixel from "utils/facebook";
import service from "services";
import whatsappLogo from "assets/images/whatsappLogo.svg";
import emailIco from "assets/images/mail_ico.svg";
import {
  VideoContainer,
  ForbiddenDeviceContainer,
  Text,
  ForbiddenDeviceContent,
  Button,
  Subtitle,
  TeacherContact,
  TeacherContactText,
  TeacherCircleIcon
} from "./styles";
import vimeoId from "../../../../utils/validate";
import teacherNotification from "assets/images/icons/teacher-notification.svg";

class VideoPlayer extends Component {
  activities = {};

  constructor(...args) {
    super(...args);
    const { subjectSelected } = this.props;
    this.state = {
      prevSubjectSelected: subjectSelected,
      sessions: [],
      isAutoplayOn: true,
      pageChanging: false,
      videoSetup: false,
      videoVolume: null,
      teacherContactActive: false
    };
  }

  componentDidMount() {
    if (!this.isQuiz()) {
      // this.initWebSocket();
      this.autoPlayHandler();
      this.visibilityChecker();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAutoplayOn, playing } = nextProps;
    this.setState({
      isAutoplayOn
    });
    this.handleAutomaticPauseAndPlay(playing);
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /* TODO: improve video handling */
  handleAutomaticPauseAndPlay = async playing => {
    const { videoSetup, videoVolume } = this.state;

    if (!videoSetup) return null;

    const iframe = document.querySelector("#player");
    const player = new Vimeo(iframe);
    const volumeValue = await player.getVolume(volume => volume);

    if (volumeValue !== 0) {
      this.setState({
        videoVolume: volumeValue
      });
    }

    const playPromise = player.setVolume(0).then(async () => {
      await player.play();
    });

    if (playPromise !== undefined) {
      if (playing) {
        player.setVolume(videoVolume || 1);
      } else {
        playPromise.then(() => {
          player.pause();
          player.currentTime = 0;
        });
      }
    }
  };

  componentDidUpdate() {
    const { subjectSelected } = this.props;
    const { prevSubjectSelected } = this.state;

    if (prevSubjectSelected.id !== subjectSelected.id) {
      if (this.playerDOM) {
        const iframe = document.querySelector("#player");
        const player = new Vimeo(iframe);
        mixpanel.track("Video changed", {
          video: subjectSelected.name
        });
        player.destroy().then(() => {
          this.autoPlayHandler();
        });
      }
    }
  }

  async getUserActivities({ lesson, subject }) {
    const { token, course, user } = this.props;

    let activities = await service.getUserActivities(token, {
      user: user.id,
      course: course.id,
      lesson,
      subject
    });
    if (activities.error) {
      activities = {};
    } else {
      [activities] = activities;
    }

    this.activities = activities;
  }

  isQuiz = () => {
    const {
      subjectSelected,
      lessonsAndSubjects: { allSubjects }
    } = this.props;
    const currentSubject = allSubjects.find(
      subject => subject.id === subjectSelected.id
    );
    return currentSubject === null || currentSubject === undefined;
  };

  autoPlayHandler = async () => {
    const {
      subjectSelected,
      lessonsAndSubjects: { allSubjects, allLessons },
      currentLessonId,
      courseName,
      markerSelected,
      hasTimeQuery,
      playing,
      showNPSModal,
      course,
      user
    } = this.props;

    this.counter = 0;
    this.pauseCounter();

    const subjectVideoUrl = allSubjects.find(
      subject => subject.id === subjectSelected.id
    ).url_video;
    const subjectSelectedIndex = allSubjects.findIndex(
      subject => subject.id === subjectSelected.id
    );
    const videoContainer = document.querySelector("#player");
    const iframe = document.createElement("iframe");
    if (this.state.isAutoplayOn) {
      iframe.setAttribute("allow", "autoplay");
    }
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.setAttribute("mozallowfullscreen", "true");
    iframe.setAttribute("data-ready", "true");
    iframe.src = `https://player.vimeo.com/video/${vimeoId(
      subjectVideoUrl
    )}?title=0&byline=0&portrait=0`;
    videoContainer.appendChild(iframe, { width: "100px" });
    const lesson = allLessons.find(({ id }) => {
      return id == currentLessonId;
    });
    lesson &&
      facebookPixel.viewContent({
        content_type: courseName,
        content_lesson: lesson.name,
        content_subject: subjectSelected.name,
        free: lesson.is_free,
        content_name: "Player",
        evaluation: markerSelected
      });

    await this.getUserActivities({
      user: user.id,
      lesson: lesson.id,
      subject: subjectSelected.id
    });

    if (this.activities) {
      this.counter = this.activities.time_consumed || 0;
    }

    const player = new Vimeo(iframe);

    if (player) {
      player.ready().then(() => {
        if (hasTimeQuery >= 0) {
          player.setCurrentTime(hasTimeQuery);
        } else if (this.activities) {
          player.setCurrentTime(this.activities.time || 0);
        }

        player.on("timeupdate", ({ duration, seconds }) => {
          const finishVideoAt = duration - 3;
          if (seconds >= finishVideoAt) {
            if (allSubjects.length - 1 === subjectSelectedIndex) return null;

            if (this.state.isAutoplayOn && !this.state.pageChanging) {
              this.setState({
                pageChanging: true
              });
              this.playNextSubject(subjectSelectedIndex);
              this.updateUserEnrollment(lesson, subjectSelected, duration);
            }
          }
        });

        player.on("play", duration => {
          this.countTime();
          this.updateUserEnrollment(lesson, subjectSelected, duration);
          mixpanel.track("Play video");
        });

        player.on("ended", duration => {
          this.updateUserEnrollment(lesson, subjectSelected, duration);
        });

        player.on("pause", duration => {
          this.pauseCounter();
          this.updateUserEnrollment(lesson, subjectSelected, duration);
          mixpanel.track("Pause video");
        });

        player.on("seeked", duration => {
          this.updateUserEnrollment(lesson, subjectSelected, duration);
          mixpanel.track("Seeked video");
        });

        player.on("bufferstart", duration => {
          this.pauseCounter();
        });

        player.on("bufferend", duration => {
          this.countTime();
        });

        if (this.state.isAutoplayOn) {
          this.setState({ teacherContactActive: true });
          setTimeout(
            () => this.setState({ teacherContactActive: false }),
            4000
          );

          player.play();
        }
        this.setState({
          prevSubjectSelected: subjectSelected,
          videoSetup: true
        });

        showNPSModal(course.id).then(result => {
          this.handleAutomaticPauseAndPlay(!result);
        });
      });
    }
  };

  updateUserEnrollment = (lesson, subjectSelected, duration) => {
    const data = {
      lesson_id: lesson.id,
      subject_id: subjectSelected.id,
      time: duration.seconds,
      time_consumed: this.counter,
      time_consumed_hidden: this.visibilityCounter
    };

    this.patchUserEnrollment(data);
  };

  playNextSubject = subjectSelectedIndex => {
    const {
      lessonsAndSubjects: { allLessons, allSubjects },
      onNewSubject
    } = this.props;
    const nextSubject = allSubjects[subjectSelectedIndex + 1];
    const newLesson = allLessons.find(lesson => {
      if (lesson.score) {
        return lesson.id === nextSubject.id;
      }
      return lesson.subjects.find(subject => subject.id === nextSubject.id);
    });

    onNewSubject(nextSubject, newLesson);
  };

  disabledPlayer = sessions => {
    return (
      <ForbiddenDeviceContainer>
        <ForbiddenDeviceContent>
          <Text>Sesiones</Text>
          {sessions.map((e, index) => {
            const parser = new UAParser(e.data.userAgent);
            const result = parser.getResult();
            return (
              <Text color="#DADADA">{`[${index + 1}] ${result.browser.name} - ${
                result.os.name
              }`}</Text>
            );
          })}
          <Subtitle color="#DADADA">
            Al hacer click en "Ver aquí" se cerrarán las sesiones en otros
            dispositivos.
          </Subtitle>
          <Button onClick={() => this.killAllSessions()}>Ver aquí</Button>
        </ForbiddenDeviceContent>
      </ForbiddenDeviceContainer>
    );
  };

  async patchUserEnrollment({ lesson_id, subject_id, time, time_consumed }) {
    const { activities } = this;
    const { token, user, course, coursesProgress, markerSelected } = this.props;

    // const { progress } = coursesProgress.find(({ courseId }) => courseId === course.id);
    // const markerProgress = progress.markerProgress.find(({ markerName }) => markerSelected === markerName);

    try {
      const body = {
        ...activities,
        lesson_id,
        subject_id,
        time,
        time_consumed: time_consumed || 0,
        course_id: course.id,
        user_id: user.id
      };

      // if (markerProgress) {
      //   body.marker = markerSelected;
      //   body.marker_progress = markerProgress.completed;
      // }

      const response = await service.patchActivities(
        token,
        body,
        activities ? activities.id : false
      );

      const iframe = document.querySelector("#player");
      const player = new Vimeo(iframe);

      if (response.data) {
        this.activities = response.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  countTime() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.counter = !this.counter ? 0 : this.counter;
        this.counter += 1;
      }, 1000);
    }
  }

  pauseCounter() {
    clearInterval(this.interval);
    delete this.interval;
  }

  visibilityChecker() {
    document.addEventListener("visibilitychange", () => {
      if (this.playerDOM) {
        const iframe = document.querySelector("#player");
        const player = new Vimeo(iframe);
        if (document.visibilityState === "hidden" && !this.visibilityInterval) {
          this.visibilityInterval = setInterval(() => {
            this.visibilityCounter = !this.visibilityCounter
              ? 0
              : this.visibilityCounter;
            this.visibilityCounter += 1;
          }, 1000);
        } else {
          clearInterval(this.visibilityInterval);
          delete this.visibilityInterval;
        }
      }
    });
  }

  registerPlayerSession() {
    const { user } = this.props;

    const dataToRegister = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      user
    };
    this.socket.emit("set-device-session", dataToRegister);
  }

  initWebSocket() {
    const { user, closeSession } = this.props;

    this.socket = io.connect(`${process.env.APRENDIENDO_PATRONUS_API}`);

    this.socket.on("connect", () => {
      this.registerPlayerSession();
      this.socket.on(`same-user-connected-${user.id}`, data => {
        this.setState({ sessions: data });
      });
      this.socket.on(`delete-device-session-${this.socket.id}`, () => {
        closeSession();
      });
    });
  }

  toggleTeacherContact = () => {
    const { teacherContactActive } = this.state;
    this.setState({ teacherContactActive: !teacherContactActive });
  };

  killAllSessions() {
    const { user } = this.props;

    this.socket.emit("delete-device-sessions", { userId: user.id });
    this.setState({ sessions: [] }, () => this.autoPlayHandler());
  }

  contactHandler = () => {
    const {
      course: {
        teacher: {
          data: { email, cellphone }
        }
      }
    } = this.props;
    if (cellphone) {
      return (
        <a
          href={`https://wa.me/51${cellphone}`}
          style={{ color: "#414042" }}
          target="blank"
        >
          Comunícate con el profesor
        </a>
      );
    }
    return (
      <a
        href={`mailto:${email}?Subject=Pregunta`}
        style={{ color: "#414042" }}
        target="_top"
      >
        Comunícate con el profesor
      </a>
    );
  };

  render() {
    const { sessions, teacherContactActive } = this.state;
    const {
      course: {
        teacher: {
          data: { email, cellphone }
        }
      }
    } = this.props;
    return (
      <Fragment>
        {sessions.length >= 1 ? (
          this.disabledPlayer(sessions)
        ) : (
          <Fragment>
            {(email || cellphone) && (
              <Fragment>
                <TeacherContact active={teacherContactActive}>
                  <TeacherContactText
                    className={
                      teacherContactActive ? "showWithDelay" : "hideWithDelay"
                    }
                  >
                    {this.contactHandler()}
                  </TeacherContactText>
                </TeacherContact>
                <TeacherCircleIcon
                  active={teacherContactActive}
                  onClick={() => this.toggleTeacherContact()}
                >
                  <img
                    style={{ width: "15px" }}
                    src={cellphone ? whatsappLogo : emailIco}
                  />
                </TeacherCircleIcon>
              </Fragment>
            )}
            <VideoContainer
              id="player"
              ref={ref => {
                this.playerDOM = ref;
              }}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  subjectSelected: PropTypes.object.isRequired,
  lessonsAndSubjects: PropTypes.object.isRequired,
  onNewSubject: PropTypes.func.isRequired,
  isAutoplayOn: PropTypes.bool.isRequired,
  setCoursesProgress: PropTypes.func,
  playing: PropTypes.bool
};

export default VideoPlayer;
