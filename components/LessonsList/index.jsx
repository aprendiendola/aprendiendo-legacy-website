import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { strToSlug } from "utils/common";
import Accordion from "components/Accordion";
import { CustomLink } from "components";
import pinIcon from "assets/images/pin.svg";
import { QuizContainer, QuizIcon, QuizTag, PinIcon } from "./styles";
import AccordionHeading from "./AccordionHeading";
import AccordionContent from "./AccordionContent";

import "./styles.scss";

const getLessonTime = lesson => {
  let timeInMinutes = 0;
  lesson.subjects.map(subject => {
    timeInMinutes += parseInt(subject.duration_time, 10);
    return timeInMinutes;
  });
  const newTimeFormat = timeInMinutes >= 3600 ? "HH:mm:ss" : "mm:ss";
  return moment()
    .startOf("day")
    .seconds(timeInMinutes)
    .format(newTimeFormat);
};

const LessonsList = ({
  marker,
  lessons,
  isFirstCourse,
  isFirstPackage,
  course,
  isBuyable,
  cartActions,
  lessonsSorted,
  getSelectedLessons,
  selectedLessons,
  searchValue,
  userEnrollment,
  showQuiz,
  showModalQuiz,
  isAccountFreezed
}) => {
  const list = lessons.map((lesson, index) => {
    const isLessonAcquired = userEnrollment.find(
      acquiredLesson => acquiredLesson.id == lesson.id
    );

    const isQuiz = showQuiz && lesson.quiz;

    if (isQuiz && lesson.is_free) {
      return (
        <QuizContainer onClick={() => showModalQuiz(lesson, true)}>
          <QuizIcon />
          {lesson.name}
          <QuizTag>Gratis</QuizTag>
        </QuizContainer>
      );
    }
    if (isQuiz && !lesson.is_free) {
      return (
        <CustomLink
          key={index}
          path={
            isLessonAcquired
              ? `/player/${strToSlug(course.university.data.short_name)}/${
                  course.slug
                }/${course.id}?quiz_id=${lesson.id}`
              : `/planes/${course.id}`
          }
        >
          <a className="lesson-list-course-wrapper lesson-list-link-wrapper">
            <QuizContainer>
              <QuizIcon />
              {lesson.name}
            </QuizContainer>
          </a>
        </CustomLink>
      );
    }
    return (
      <Accordion
        key={lesson.id}
        isExpanded={
          searchValue !== "" || (isFirstPackage === marker.name && index === 0)
        }
        heading={
          <AccordionHeading
            course={course}
            lesson={lesson}
            time={getLessonTime(lesson)}
            isBuyable={isBuyable}
            cartActions={cartActions}
            selectedLessons={selectedLessons}
            getSelectedLessons={getSelectedLessons}
            isLessonAcquired={isLessonAcquired}
          />
        }
        content={
          <AccordionContent
            course={course}
            accessible={isLessonAcquired || lesson.is_free}
            lessonId={lesson.id}
            searchValue={searchValue}
            subjects={lesson.subjects}
            isAccountFreezed={isAccountFreezed}
          />
        }
      />
    );
  });

  return (
    <div className="lesson-list-evaluations-block">
      <h3 className="lesson-list-evaluations-title">
        {marker.name.toUpperCase()}{" "}
        {isFirstPackage === marker.name && lessonsSorted && (
          <PinIcon src={pinIcon} />
        )}
      </h3>
      {list}
    </div>
  );
};

LessonsList.propTypes = {
  marker: PropTypes.shape({}),
  course: PropTypes.shape({}),
  lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFirstCourse: PropTypes.bool,
  isFirstPackage: PropTypes.any,
  isBuyable: PropTypes.bool,
  userEnrollment: PropTypes.arrayOf(PropTypes.shape({})),
  showQuiz: PropTypes.bool,
  showModalQuiz: PropTypes.func
};

LessonsList.defaultProps = {
  marker: {},
  course: {},
  lessons: [],
  isFirstCourse: false,
  isFirstPackage: false,
  isBuyable: false,
  userEnrollment: [],
  showQuiz: false
};

export default LessonsList;
