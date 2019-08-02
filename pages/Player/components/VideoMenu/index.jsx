import React from "react";
import { CustomLink } from "components";
import Link from "next/link";
import { getLessonTime } from "utils/functions";
import service from "services";
import quizIcon from "assets/images/icon-quiz.svg";
import crownIcon from "assets/images/logo_premium.svg";
import { QuizContainer, Icon } from "./styles";
import "../../styles.scss";

const VideoMenu = props => {
  const {
    markers,
    markerSelected,
    courseId,
    name,
    subjectSelected,
    getAcquiredLesson,
    university,
    showModalQuiz,
    quizId,
    userEnrollments
  } = props;

  const markerFound =
    markers && markerSelected && markers.find(e => e.name == markerSelected);

  const lessons = markerFound ? markerFound.lessons : [];
  console.log("QUIZ_ID", quizId);
  return (
    <div className="videoplayer-menu">
      {lessons.map(lesson => {
        if (lesson.quiz) {
          return (
            <div
              role="presentation"
              className="videoplayer-item"
              key={lesson.id}
              // onClick={() => showModalQuiz(lesson, true)}
            >
              <Link
                key={lesson.id}
                href={
                  getAcquiredLesson(userEnrollments, lesson, courseId) ||
                  lesson.is_free
                    ? `/${
                        service.getCountry().countryCode
                      }/player/${university}/${name}/${courseId}?quiz_id=${
                        lesson.id
                      }`
                    : `/planes/${courseId}`
                }
              >
                <a>
                  <QuizContainer isActive={quizId == lesson.id}>
                    <span>{lesson.name}</span>
                    <Icon isActive={quizId == lesson.id} />
                  </QuizContainer>
                </a>
              </Link>
            </div>
          );
        }
        return (
          <div className="videoplayer-item" key={lesson.id}>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                fontSize: "14px",
                fontWeight: 900,
                padding: 10
              }}
            >
              {!lesson.is_free && (
                <div style={{ marginRight: 10 }}>
                  <img src={crownIcon} alt="crown" style={{ height: 18 }} />
                </div>
              )}
              <div>
                <span className="lesson-title">{lesson.name}</span>
              </div>
            </div>
            {lesson.subjects &&
              lesson.subjects.map(subject => {
                if (
                  getAcquiredLesson(userEnrollments, lesson, courseId) ||
                  lesson.is_free
                ) {
                  return (
                    <Link
                      key={subject.id}
                      href={`/${
                        service.getCountry().countryCode
                      }/player/${university}/${name}/${
                        subjectSelected.slug
                      }/${courseId}/${lesson.id}/${subject.id}`}
                    >
                      <p
                        className={`item-lesson ${
                          subjectSelected.id === subject.id
                            ? "videoplayer-is-active"
                            : ""
                        }`}
                      >
                        <span className="subject">{subject.name}</span>
                        <span className="extra-info">
                          {getLessonTime(subject.duration_time || 0)}
                        </span>
                      </p>
                    </Link>
                  );
                }
                return (
                  <span key={subject.id} className="item-lesson is-inactive">
                    <span>{subject.name}</span>
                    <span className="extra-info">
                      {getLessonTime(subject.duration_time || 0)}
                    </span>
                  </span>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default VideoMenu;
