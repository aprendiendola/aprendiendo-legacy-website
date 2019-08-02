import React, { Component } from "react";
import { connect } from "react-redux";
import service from "services";
import { setUser, setUnFreezeModal } from "reducers/auth";
import { setUserEnrollments } from "reducers/courses";
import truncate from "utils/truncate";
import { CustomLink, Label } from "components";
import { strToSlug, isObject } from "utils/common";
import playIcon from "assets/images/play-now-icon.png";
import eyeIcon from "assets/images/white-eye.svg";
import resumeIcon from "assets/images/continue-icon.png";
import {
  Container,
  StyledButton,
  CourseCardContainer,
  TeacherImg,
  TeacherHover,
  TeacherHeader,
  CourseTag,
  PremiumLogo,
  ContentContainer,
  CourseTitle,
  ContentFooter,
  TeacherName
} from "./styles";

const setUrl = ({ id, slug }) => `/cursos/clases/${slug}/${id}`;

class CourseCard extends Component {
  state = {};

  renderCourseTag = () => {
    const {
      data: { is_free: isFree, is_new: isNew, release_date: releaseDate }
    } = this.props;

    let tag = {
      title: "Nuevo",
      color: "#88CE00"
    };

    if (isFree) {
      tag = {
        title: "Gratis",
        color: "#00ACF0"
      };
    } else if (releaseDate) {
      tag = {
        title: "Próximamente",
        color: "rgb(145, 44, 234)"
      };
    } else if (!isNew) {
      tag = null;
    }

    return tag && <CourseTag color={tag.color}>{tag.title}</CourseTag>;
  };

  renderActionButton = () => {
    const {
      data: {
        id,
        slug,
        university,
        is_free: isFree,
        formatted_price_per_lesson: formattedPricePerLesson,
        price,
        release_date: releaseDate,
        release_text: releaseText
      },
      userEnrollments,
      lowestPrice,
      isAccountFreezed
    } = this.props;

    if (isAccountFreezed) {
      return {
        infoText: "Descongelar",
        action: ""
      };
    }

    if (userEnrollments && Array.isArray(userEnrollments)) {
      const getCourseEnrollment = userEnrollments.find(
        enrollment => enrollment.course_id === id
      );
      const universitySlug = strToSlug(university.data.short_name);

      if (getCourseEnrollment) {
        const {
          acquired_lessons: { data: lessons }
        } = getCourseEnrollment;
        if (lessons.length > 0) {
          let currentLesson = lessons[0];
          let activitySubject;

          if (isObject(getCourseEnrollment.activities)) {
            const foundedLesson = lessons.find(
              ({ id }) => id === getCourseEnrollment.activities.lesson_id
            );

            if (foundedLesson) {
              activitySubject = currentLesson.subjects.find(
                ({ id }) => getCourseEnrollment.activities.subject_id === id
              );
            }

            currentLesson = foundedLesson || currentLesson;
          }

          const { id: lessonId, subjects } = currentLesson;

          // const currentSubject = activitySubject || subjects[0];

          // const subjectSlug = `${strToSlug(currentSubject.name)}/`;
          // const lessonOrSubjectId = `/${lessonId}/${currentSubject.id}`;

          return {
            infoText: isObject(getCourseEnrollment.activities)
              ? "Reanudar"
              : "Ver ahora",
            action: (
              <img
                style={{ marginLeft: "5px" }}
                alt="playIcon"
                src={
                  isObject(getCourseEnrollment.activities)
                    ? resumeIcon
                    : playIcon
                }
              />
            ),
            // url: `/player/${universitySlug}/${slug}/${subjectSlug}${id}${lessonOrSubjectId}`,
            url: ""
          };
        }

        return {
          infoText: "Empezar curso",
          action: (
            <img style={{ marginLeft: "5px" }} alt="playIcon" src={playIcon} />
          ),
          url: `/player/${universitySlug}/${slug}/${id}`
        };
      }
    }

    if (isFree) {
      return {
        infoText: "Empezar a ver",
        action: ""
      };
    }

    if (releaseDate) {
      return {
        infoText: "Disponible en",
        secondaryInfoText: releaseText,
        action: "",
        textColor: "#707070"
      };
    }

    return {
      infoText: "Ver detalles",
      action: ""
    };
  };

  render() {
    const {
      data: {
        id,
        name,
        slug,
        university,
        is_free: isFree,
        teacher,
        image,
        university: {
          data: { color }
        }
      },
      user,
      lowestPrice,
      isAccountFreezed,
      setUnFreezeModal
    } = this.props;
    const {
      infoText,
      action,
      url,
      textColor,
      secondaryInfoText
    } = this.renderActionButton();

    return (
      <Container>
        <CourseCardContainer>
          <TeacherImg img={image}>
            <CustomLink path={setUrl({ id, slug })}>
              <TeacherHover>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img src={eyeIcon} alt="eye" />
                  <div style={{ padding: 5 }}>
                    <Label isClickable>Ver detalles</Label>
                  </div>
                </div>
              </TeacherHover>
            </CustomLink>
            <TeacherHeader>
              {this.renderCourseTag()}
              {!isFree && <PremiumLogo />}
            </TeacherHeader>
          </TeacherImg>
          <ContentContainer>
            <CourseTitle>{truncate(name.toUpperCase(), 40)}</CourseTitle>
            <ContentFooter>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TeacherName>con {teacher.data.name}</TeacherName>
              </div>
            </ContentFooter>
          </ContentContainer>
        </CourseCardContainer>
        <CustomLink path={url || setUrl({ id, slug })}>
          <StyledButton
            onClick={() => isAccountFreezed && setUnFreezeModal(true)}
          >
            <Label color={textColor || "#1178f2"} isClickable>
              {`${infoText}`}
              {secondaryInfoText ? (
                <b
                  style={{
                    fontWeight: "900",
                    color: "#1178f2",
                    margin: "0 5px"
                  }}
                >
                  {secondaryInfoText}
                </b>
              ) : (
                ""
              )}
              {action}
            </Label>
          </StyledButton>
        </CustomLink>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  setUserToState: user => setUser(user),
  setUserEnrollmentsToState: data => setUserEnrollments(data),
  setUnFreezeModal: bool => setUnFreezeModal(bool)
};

const mapStateToProps = ({ courses, auth }) => {
  return {
    token: auth.token,
    user: auth.user,
    userEnrollments: courses.userEnrollments
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCard);
