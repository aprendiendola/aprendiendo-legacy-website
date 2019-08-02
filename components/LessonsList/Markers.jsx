import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { setSearchLessonValue } from "reducers/auth";
import { objectCopy, normalizeString } from "utils/common";
import { Twemoji } from "react-emoji-render";
import { EmptyContainer, Title, List, Li } from "./styles";

import LessonsList from ".";

const getTeacherURL = ({ teacher }) =>
  teacher.cellphone
    ? `https://api.whatsapp.com/send?phone=+51${teacher.cellphone}`
    : `mailto:${teacher.email}`;

const EmptyTitle = teacher => (
  <EmptyContainer>
    <Title>
      No encontramos lo que estás buscando
      <Twemoji style={{ marginLeft: "10px" }} svg text=":'(" />
    </Title>

    <List>
      <Li>Intenta buscar con otras palabras.</Li>
      <Li>Usa términos genéricos.</Li>
      <Li>
        Si nada te funciona,{" "}
        <a target="blank" href={getTeacherURL(teacher)}>
          contacta al profesor
        </a>
      </Li>
    </List>
  </EmptyContainer>
);

class Markers extends Component {
  state = {
    visibleLessons: [],
    originalLessons: [],
    hasLessons: true
  };

  componentDidMount() {
    const { visibleLessons } = this.state;
    const { course, setSearchValue } = this.props;

    const groupedLessons = course.markers.data;

    setSearchValue("");

    const originalLessons = objectCopy(groupedLessons);

    this.setState({ visibleLessons: groupedLessons, originalLessons });
  }

  // componentWillReceiveProps(nextProps) {
  //   const { course } = nextProps;

  //   const groupedLessons = course.markers.data;
  //   const originalLessons = objectCopy(groupedLessons);

  //   this.setState({ visibleLessons: groupedLessons, originalLessons });
  // }

  // static getDerivedStateFromProps(props, state) {
  //   const { course, searchValue } = props;
  //   let { visibleLessons, originalLessons } = state;

  //   const foundedKeys = {};
  //   let hasFoundSubjects = false;
  //   const hasFoundLessons = searchValue !== '' ? [] : [true];

  //   Object.keys(originalLessons).forEach(key => {
  //     const currentLesson = originalLessons[key];
  //     foundedKeys[key] = [];
  //     Object.keys(currentLesson).forEach(index => {
  //       if (currentLesson[index].subjects) {
  //         const foundedSubjects = currentLesson[index].subjects.filter(({ name: subjectName }) => normalizeString(subjectName).includes(normalizeString(searchValue)));
  //         if (foundedSubjects.length > 0) {
  //           hasFoundSubjects = true;
  //           foundedKeys[key].push(currentLesson[index]);
  //         }
  //       } else if (currentLesson[index].score) {
  //         if (currentLesson[index].name.includes(normalizeString(searchValue))) {
  //           hasFoundSubjects = true;
  //           foundedKeys[key].push(currentLesson[index]);
  //         }
  //       }
  //     });
  //   });

  //   visibleLessons = foundedKeys;

  //   if (!hasFoundSubjects && searchValue !== '') {
  //     Object.keys(originalLessons).forEach(key => {
  //       visibleLessons[key] = originalLessons[key].filter(({ name }) => normalizeString(name).includes(normalizeString(searchValue)));

  //       hasFoundLessons.push(visibleLessons[key].length > 0);
  //     });
  //   }

  //   return { visibleLessons, hasLessons: hasFoundSubjects || hasFoundLessons.includes(true) };
  // }

  render() {
    const {
      course,
      isBuyable,
      userEnrollment,
      lessonsSorted,
      showQuiz,
      showModalQuiz,
      isAccountFreezed,
      searchValue
    } = this.props;
    console.log(userEnrollment);
    const { visibleLessons, hasLessons, originalLessons } = this.state;
    const first = visibleLessons.length > 0 ? visibleLessons[0].name : "";
    const list = visibleLessons.map(marker => {
      return (
        <LessonsList
          key={marker.name} // Marker play's key role
          marker={marker}
          course={course}
          lessons={marker.lessons}
          isFirstPackage={first}
          isFirstCourse
          isBuyable={isBuyable}
          userEnrollment={userEnrollment}
          showQuiz={showQuiz}
          searchValue={searchValue}
          showModalQuiz={showModalQuiz}
          lessonsSorted={lessonsSorted}
          isAccountFreezed={isAccountFreezed}
        />
      );
    });

    return (
      <div>
        {hasLessons ? list : <EmptyTitle teacher={course.teacher.data} />}
      </div>
    );
  }
}

Markers.propTypes = {
  course: PropTypes.shape({}).isRequired,
  isBuyable: PropTypes.bool,
  userEnrollment: PropTypes.arrayOf(PropTypes.shape({})),
  showQuiz: PropTypes.bool,
  showModalQuiz: PropTypes.func
};

const mapDispatchToProps = {
  setSearchValue: value => setSearchLessonValue(value)
};

const mapStateToProps = ({ auth }) => ({
  searchValue: auth.searchValue
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Markers);
