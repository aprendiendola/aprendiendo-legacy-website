import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Router } from "routes";
import { withRouter } from "next/router";
import moment from "moment";
import PageLoader from "components/PageLoader";
import Banner from "components/OfferBanner";
import Quiz from "components/Quiz";
import { NpsModal } from "components";
import service from "services";
import Switch from "react-ios-switch";
import {
  findSubject,
  getAcquiredLesson,
  lessonsAndSubjectsAvailable,
  splitUrl,
  getUrlParams
} from "utils/common";
import Access from "utils/access";
import { authToInitialState, setChangePlanModal } from "../../reducers/auth";
import { setCourses } from "reducers/progress";
import { updateRoute } from "reducers/history";
import { clearUserCourses } from "../../reducers/courses";
import { VideoMenu, VideoPlayer, VideoToolbar } from "./components";
import facebookPixel from "utils/facebook";
import { ToggleSwitchContainer, TopVideoMenuContainer } from "./styles";
import "./styles.scss";

const DEFAULT_NPS_MODAL_ID = 1;
const MAX_MINUTS_NPS = 27;

class Player extends Component {
  state = {
    markers: null,
    markerSelected: "",
    selectedSubject: null,
    isAutoplayOn: true,
    isLoading: true,
    course: {
      data: {}
    },
    videoMenuHeight: "",
    activeModal: false,
    quiz: {},
    suggestions: [],
    activeNPSModal: false,
    playing: true,
    blockVideoplayer: true
  };

  activities = {};

  componentDidMount() {
    window.scrollTo(0, 0);
    const { user, router, setRoute, token } = this.props;

    const access = new Access(user);

    if (!access.videoPlayer.allowed) {
      Router.push(`/${service.getCountry().countryCode}/cursos`);
    }

    if (!access.auth.allowed) {
      setRoute(router.asPath);
      Router.push(`/${service.getCountry().countryCode}/login`);
    } else {
      this.hideVideoplayerByBarriers(token).then(hide => {
        if (!hide) {
          this.setState(
            {
              blockVideoplayer: false
            },
            () => {
              this.loadCourse();
            }
          );
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { markers } = this.state;
    const { router } = nextProps;

    const pathIntoArray = splitUrl(router.asPath);
    const lessonId = pathIntoArray[7];
    const subjectId = pathIntoArray[8];

    if (getUrlParams(router.asPath).quiz_id) {
      const { quiz_id: quizId } = getUrlParams(router.asPath);
      const quizFound = this.findQuiz(markers, quizId);

      return this.setState({
        markerSelected: quizFound.marker,
        selectedSubject: quizId,
        activeModal: true
      });
    }

    if (markers && lessonId && subjectId) {
      const subjectDataFound = findSubject(markers, lessonId, subjectId);

      this.setState({
        markerSelected: subjectDataFound.marker,
        selectedSubject: subjectDataFound.subject
      });
    }
  }

  hideVideoplayerByBarriers = async token => {
    const { setChangePlanModal, router } = this.props;
    const pathIntoArray = splitUrl(router.asPath);
    const courseId =
      pathIntoArray[6] ||
      pathIntoArray[5].slice(0, pathIntoArray[5].indexOf("?"));

    const params = { courseId: courseId };

    const { data } = await service.getBarriers(token, params);

    let blockVideoplayer = false;

    if (data) {
      data.forEach(barrier => {
        if (!barrier.barrier_up) {
          setChangePlanModal(barrier);

          blockVideoplayer = true;
        }
      });
    }

    return blockVideoplayer;
  };

  showNPSModal = async courseId => {
    const { token, user } = this.props;
    let options = {};

    options.range = {
      from: moment("2019-03-18"),
      to: moment("2019-07-10")
    };
    options.courseId = courseId;

    const response = await service.getCurrentMinutsConsumed(token, options);

    if (response.data && response.data > MAX_MINUTS_NPS) {
      // Validate last poll submits
      const { data } = await service.getPollResultByUserId(
        token,
        user.id,
        courseId
      );
      const hasPollSubmits = data.length > 0;

      if (hasPollSubmits) {
        return false;
      }

      if (true) {
        this.setState({
          activeNPSModal: true
        });
        this.onPauseVideo();
        return true;
      }
    }
  };

  onChange = e => {
    this.setState({ markerSelected: e.target.value });
  };

  onNewSubject = (subject, newLesson) => {
    const { router } = this.props;

    const pathIntoArray = splitUrl(router.asPath);
    const university = pathIntoArray[3];
    const name = pathIntoArray[4];
    const courseId =
      pathIntoArray[6] ||
      pathIntoArray[5].slice(0, pathIntoArray[5].indexOf("?"));

    if (newLesson.score) {
      return Router.push(
        `/${
          service.getCountry().countryCode
        }/player/${university}/${name}/${courseId}?quiz_id=${newLesson.id}`
      );
    }
    Router.push(
      `/${service.getCountry().countryCode}/player/${university}/${name}/${
        subject.slug
      }/${courseId}/${newLesson.id}/${subject.id}`
    );
  };

  getSuggestionLink = currentQuiz => {
    console.log(currentQuiz);
    const quiz = currentQuiz.quiz;
    const questions = quiz.questions;

    const {
      course: {
        data: {
          id,
          slug,
          markers: { data }
        }
      }
    } = this.state;
    const { userEnrollments } = this.props;
    const { allLessons, allSubjects } = lessonsAndSubjectsAvailable(
      userEnrollments,
      data,
      id
    );
    const suggestions = [];
    questions.map(({ suggestion }) => {
      const lessonFound = allLessons.find(
        lesson => lesson.id == suggestion.lesson_id
      );
      const hasAccess =
        lessonFound && getAcquiredLesson(userEnrollments, lessonFound, id);
      const subjectFound = allSubjects.find(
        subject => subject.id === suggestion.subject_id
      );
      return suggestions.push({
        hasAccess,
        lessonId: suggestion && suggestion.lesson_id,
        lessonName: lessonFound && lessonFound.name,
        courseSlug: slug,
        subjectId: suggestion && suggestion.subject_id,
        subjectName: subjectFound && subjectFound.name,
        subjectSlug: subjectFound && subjectFound.slug,
        time: suggestion && suggestion.time
      });
    });

    return suggestions;
  };

  hasAccessToCourse = course => {
    const {
      data: {
        markers: { data: markers }
      }
    } = course;

    if (course.is_free) {
      return true;
    }

    const hasLessonFree =
      markers
        .map(marker => {
          return marker.lessons.find(lesson => lesson.is_free);
        })
        .filter(lesson => lesson !== undefined).length > 0;

    if (hasLessonFree) {
      return true;
    }

    const { userEnrollments } = this.props;

    const {
      acquired_lessons: { data: userEnrollment }
    } = userEnrollments.find(
      enrollment => enrollment.course_id === course.data.id
    );
    let hasAcquiredLesson = false;
    const allLessons = [];

    markers.map(marker => {
      return marker.lessons.map(lesson => allLessons.push(lesson));
    });
    userEnrollment.forEach(enrollment =>
      allLessons.forEach(lesson => {
        if (enrollment.id === lesson.id) {
          hasAcquiredLesson = true;
        }
      })
    );

    if (userEnrollment && hasAcquiredLesson) {
      return true;
    }

    return false;
  };

  loadCourse = async () => {
    const { router, token } = this.props;

    const pathIntoArray = splitUrl(router.asPath);

    const courseId =
      pathIntoArray[6] ||
      pathIntoArray[5].slice(0, pathIntoArray[5].indexOf("?"));

    try {
      const response = await service.getCourse(courseId, token);
      if (!response.error) {
        const course = response;
        if (!this.hasAccessToCourse(course)) {
          return Router.push(
            `/${service.getCountry().countryCode}/cursos/${course.data.name}/${
              course.data.id
            }`
          );
        }

        this.setState({ course }, async () => {
          await this.loadClassesList();
          facebookPixel.playerView({
            course: course.data.name,
            university: course.data.university.data.name
          });
        });
      }
    } catch (error) {
      throw error;
    }
  };

  getSubjectIdFromUrl = () => {
    const { router } = this.props;

    const pathIntoArray = splitUrl(router.asPath);
    const lessonId = pathIntoArray[7] || pathIntoArray[5].split("=")[1];
    let subjectId;
    if (pathIntoArray[8]) {
      if (pathIntoArray[8].indexOf("?") >= 0) {
        return {
          lessonId,
          subjectId: pathIntoArray[8].slice(0, pathIntoArray[8].indexOf("?"))
        };
      }
      return {
        lessonId,
        subjectId: pathIntoArray[8]
      };
    }

    return {
      lessonId,
      subjectId
    };
  };

  loadClassesList = async () => {
    const { userEnrollments } = this.props;
    const { lessonId, subjectId } = this.getSubjectIdFromUrl();
    const {
      course: {
        data: {
          id,
          name,
          is_free: isFree,
          markers: { data: markers }
        }
      }
    } = this.state;

    let subjectDataFound = "";

    try {
      if (lessonId && subjectId) {
        console.log("lesson to find", lessonId);
        subjectDataFound = findSubject(markers, lessonId, subjectId);
        mixpanel.track("Video player", {
          isFree,
          courseName: name,
          video: subjectDataFound.subject.name,
          evaluation: subjectDataFound.marker
        });
        this.setState(
          {
            markers,
            markerSelected: subjectDataFound.marker,
            selectedSubject: subjectDataFound.subject
          },
          () => {
            if (window.innerWidth >= 1024) {
              const getVideoPlayerContainer = document.getElementById(
                "player-wrapped"
              );
              const windowMaxHeight = getVideoPlayerContainer.clientHeight;
              this.setState({ videoMenuHeight: windowMaxHeight });
            }
          }
        );
      } else if (subjectId === null || subjectId === undefined) {
        const quizId = lessonId;
        const quizFound = this.findQuiz(markers, quizId);

        const { allLessons } = lessonsAndSubjectsAvailable(
          userEnrollments,
          markers,
          id
        );

        const foundLesson = allLessons.find(lesson => lesson.id == quizId);

        this.setState(
          {
            markers,
            markerSelected: quizFound.marker,
            selectedSubject: quizId
          },
          () => {
            (getAcquiredLesson(userEnrollments, foundLesson, id) ||
              foundLesson.is_free) &&
              this.showModalQuiz(foundLesson, true);
          }
        );
      } else {
        const markerWithAccessibleSubject = markers
          .map(marker => {
            return marker.lessons.find(
              lesson =>
                getAcquiredLesson(userEnrollments, lesson, id) ||
                lesson.is_free === true
            );
          })
          .filter(value => {
            if (value !== undefined) {
              return value;
            }
            return false;
          });

        const selectedSubject = markerWithAccessibleSubject[0].subjects[0];

        subjectDataFound = {
          marker: markerWithAccessibleSubject,
          subject: selectedSubject
        };
        const key = Object.keys(markers);
        mixpanel.track("Video player", {
          isFree,
          courseName: name,
          video: subjectDataFound.subject.name,
          evaluation: key[0]
        });
        this.setState(
          {
            markers,
            markerSelected: key[0],
            selectedSubject: subjectDataFound.subject
          },
          () => {
            if (window.innerWidth >= 1024) {
              const getVideoPlayerContainer = document.getElementById(
                "player-wrapped"
              );
              const windowMaxHeight = getVideoPlayerContainer.clientHeight;
              this.setState({ videoMenuHeight: windowMaxHeight });
            }
          }
        );
      }
    } catch (error) {
      throw error;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  findQuiz = (markers, lessonId) => {
    let markerSelected = "";
    markers
      .map(marker => {
        return marker.lessons.find(lesson => {
          if (lesson.id == lessonId) {
            markerSelected = marker.name;
          }
          return lesson.id == lessonId;
        });
      })
      .filter(value => {
        if (value !== undefined) {
          return value;
        }
        return false;
      });

    return {
      marker: markerSelected
    };
  };

  toggleActionButtons = () => {
    const { router, userEnrollments } = this.props;

    const pathIntoArray = splitUrl(router.asPath);
    const subjectId = pathIntoArray[8];

    const {
      selectedSubject,
      markers,
      course: { data: course }
    } = this.state;

    const { allLessons, allSubjects } = lessonsAndSubjectsAvailable(
      userEnrollments,
      markers,
      course.id
    );

    const lastLesson = allLessons[allLessons.length - 1];

    const isDisableButtons = {};
    console.log(lastLesson);
    if (lastLesson) {
      const lastSubject = lastLesson.quiz
        ? allSubjects[allSubjects.length - 1]
        : lastLesson.subjects[lastLesson.subjects.length - 1];

      if (allLessons[0].subjects[0].id !== subjectId) {
        isDisableButtons.prev = false;
      } else {
        isDisableButtons.prev = true;
      }

      if (lastSubject.id !== selectedSubject.id) {
        isDisableButtons.next = false;
      } else {
        isDisableButtons.next = true;
      }

      if (!subjectId) {
        isDisableButtons.prev = true;
      }
    }
    return isDisableButtons;
  };

  autoplayHandler = checked => {
    this.setState({ isAutoplayOn: checked });
  };

  showModalQuiz = (currentQuiz, active) => {
    const { userEnrollments } = this.props;
    const {
      selectedSubject,
      course: {
        data: {
          id,
          markers: { data }
        }
      }
    } = this.state;

    const { allLessons, allSubjects } = lessonsAndSubjectsAvailable(
      userEnrollments,
      data,
      id
    );

    if (active === false) {
      const foundLesson = allLessons.find(
        lesson => lesson.id == selectedSubject
      );
      const subjectSelectedIndex = allSubjects.findIndex(
        subject => subject.id == foundLesson.id
      );

      if (allSubjects.length - 1 == subjectSelectedIndex)
        return this.setState({ activeModal: active });

      const nextSubject = allSubjects[subjectSelectedIndex + 1];
      const newLesson = allLessons.find(lesson => {
        if (lesson.score) {
          return lesson.id == nextSubject.id;
        }
        return lesson.subjects.find(subject => subject.id == nextSubject.id);
      });
      return this.setState({ quiz: newLesson, activeModal: active }, () => {
        this.onNewSubject(nextSubject, newLesson);
      });
    }
    const suggestions = this.getSuggestionLink(currentQuiz);

    this.setState({ suggestions, activeModal: active, quiz: currentQuiz });
  };

  closeSession = () => {
    const { clearAuth, clearUserCourses } = this.props;
    localStorage.clear();
    clearAuth();
    clearUserCourses();
    Router.push(`/${service.getCountry().countryCode}/login`);
  };

  handleCloseNpsModal = () => {
    this.setState({
      activeNPSModal: false
    });
    this.onResumeVideo();
    document.getElementsByTagName("html")[0].style.overflowY = "scroll";
  };

  onPauseVideo = () => {
    this.setState({
      playing: false
    });
  };

  onResumeVideo = () => {
    this.setState({
      playing: true
    });
  };

  handleNPSModalSubmit = values => {
    const { user, token } = this.props;
    const {
      course: { data: course }
    } = this.state;

    const body = {
      user_id: user.id,
      course_id: course.id,
      poll_id: DEFAULT_NPS_MODAL_ID,
      score: values.referRating,
      snapshot: JSON.stringify(values)
    };

    return service.savePollResult(token, body);
  };

  render() {
    const {
      markers,
      markerSelected,
      selectedSubject,
      isAutoplayOn,
      isLoading,
      course: {
        data: course,
        data: { name: courseName, teacher, university }
      },
      videoMenuHeight,
      activeModal,
      quiz,
      suggestions,
      activeNPSModal,
      playing,
      blockVideoplayer
    } = this.state;
    const {
      router,
      userEnrollments,
      token,
      user,
      coursesProgress
    } = this.props;

    const pathIntoArray = splitUrl(router.asPath);

    const name = pathIntoArray[4];
    const courseId =
      pathIntoArray[6] ||
      pathIntoArray[5].slice(0, pathIntoArray[5].indexOf("?"));
    let lessonId = null;
    let quizId = null;
    if (pathIntoArray[7]) {
      lessonId = pathIntoArray[7];
    } else {
      quizId = pathIntoArray[5].split("=")[1];
    }

    if (activeNPSModal) {
      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    }

    const universitySlug = pathIntoArray[3];

    let hasTimeQuery;

    if (getUrlParams(router.asPath).time) {
      const { time } = getUrlParams(router.asPath);
      hasTimeQuery = time;
    }

    if (blockVideoplayer) {
      return <div />;
    }

    return (
      <Fragment>
        <div className="videoplayer-container">
          {isLoading && <PageLoader />}
          <div>
            {user && user.access_type === "enrolled" && !course.is_free && (
              <Banner />
            )}
          </div>
          <div className="player-section">
            <div className="player-wrapper" id="player-wrapped">
              {course &&
                selectedSubject &&
                (!quizId || parseInt(hasTimeQuery) >= 0) && (
                  <VideoPlayer
                    subjectSelected={selectedSubject}
                    lessonsAndSubjects={lessonsAndSubjectsAvailable(
                      userEnrollments,
                      markers,
                      courseId
                    )}
                    isAutoplayOn={isAutoplayOn}
                    onNewSubject={this.onNewSubject}
                    currentLessonId={lessonId}
                    markerSelected={markerSelected}
                    courseName={courseName}
                    user={user}
                    token={token}
                    course={course}
                    closeSession={this.closeSession}
                    hasTimeQuery={hasTimeQuery}
                    coursesProgress={coursesProgress}
                    userEnrollments={userEnrollments}
                    playing={playing}
                    showNPSModal={this.showNPSModal}
                  />
                )}
              {course &&
                selectedSubject &&
                (!quizId || parseInt(hasTimeQuery) >= 0) && (
                  <VideoToolbar
                    subjectSelected={selectedSubject}
                    currentLessonId={lessonId}
                    course={course}
                    lessonsAndSubjects={lessonsAndSubjectsAvailable(
                      userEnrollments,
                      markers,
                      courseId
                    )}
                    isDisabledButtons={this.toggleActionButtons()}
                    onNewSubject={this.onNewSubject}
                  />
                )}
            </div>
            <div
              className="menu-wrapper"
              style={{
                height: `${videoMenuHeight ? `${videoMenuHeight - 10}px` : ""}`
              }}
            >
              <TopVideoMenuContainer>
                <h3 style={{ maxWidth: "175px" }}>{course.name}</h3>
                <ToggleSwitchContainer>
                  <p>Autoplay</p>
                  <Switch
                    checked={isAutoplayOn}
                    className="switch"
                    offColor="#d1d3d4"
                    onColor="#1178f2"
                    style={{
                      height: "20px",
                      width: "40px",
                      cursor: "pointer"
                    }}
                    onChange={checked => this.autoplayHandler(checked)}
                  />
                  {/* <ToggleSwitch for="toggle" className="switch-toggle inner">
                    <input
                      checked={isAutoplayOn}
                      onClick={e => this.autoplayHandler(e)}
                      id="toggle"
                      type="checkbox"
                    />
                    <div />
                  </ToggleSwitch> */}
                </ToggleSwitchContainer>
              </TopVideoMenuContainer>
              <select
                className="tests-select"
                style={{
                  background:
                    "url(/static/images/arrow-select.svg) no-repeat right #414042",
                  color: "#fff"
                }}
                value={markerSelected}
                onChange={e => this.onChange(e)}
              >
                {markers &&
                  markers.map(marker => (
                    <option key={marker.name} value={marker.name}>
                      {marker.name}
                    </option>
                  ))}
              </select>
              <VideoMenu
                markers={markers}
                markerSelected={markerSelected}
                courseId={courseId}
                name={name}
                university={universitySlug}
                subjectSelected={selectedSubject}
                getAcquiredLesson={getAcquiredLesson}
                showModalQuiz={this.showModalQuiz}
                userEnrollments={userEnrollments}
                quizId={quizId}
              />
            </div>
          </div>
          {/* <div className="info-section">
            {
          selectedSubject && (
            <Fragment>
              <ContentSection>
                <DescriptionAndFeedbackContainer>
                  {selectedSubject.notes && (
                    <Fragment>
                      <span className="description-title">
                        Descripción
                      </span>
                      <span
                        style={{
                          borderBottom: '1px solid #d2d4d5',
                          paddingBottom: '13px',
                          marginBottom: '26px'
                        }}
                      >
                        {selectedSubject.notes}
                      </span>
                    </Fragment>
                  )}
                </DescriptionAndFeedbackContainer>
                <TeacherCard
                  universityName={university.data.name}
                  teacherAvatar={teacher.data.avatar}
                  teacherName={teacher.data.name}
                  courseName={courseName}
                />
              </ContentSection>
            </Fragment>
          )
        }
          </div> */}
          {activeModal && (
            <Quiz
              active={activeModal}
              showModalQuiz={this.showModalQuiz}
              handleClose={() => this.showModalQuiz("", false)}
              quiz={quiz}
              suggestions={suggestions}
              course={course}
            />
          )}
        </div>
        <NpsModal
          userName={user ? user.name : ""}
          showModal={activeNPSModal}
          handleClose={this.handleCloseNpsModal}
          handleSubmit={this.handleNPSModalSubmit}
          teacherName={teacher && teacher.data.name}
          courseName={courseName}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, courses, progress }) => ({
  token: auth.token,
  user: auth.user,
  userEnrollments: courses.userEnrollments,
  coursesProgress: progress.courses
});

const mapDispatchToProps = {
  clearAuth: () => authToInitialState(),
  clearUserCourses: () => clearUserCourses(),
  setRoute: route => updateRoute(route),
  setCoursesProgress: courses => setCourses(courses),
  setChangePlanModal: bool => setChangePlanModal(bool)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Player));
