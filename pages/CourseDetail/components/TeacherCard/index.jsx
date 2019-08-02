import React, { Component } from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { CustomLink, LargeButton } from "components";
import ReactTooltip from "react-tooltip";
import TeacherStar from "components/TeacherStar";
import { Router } from "routes";
import Button from "components/Button";
import videoIcon from "assets/images/icons/video@2x.png";
import teacherProfile from "assets/images/default-teacher.svg";
import bookIcon from "assets/images/icons/book@2x.png";
import downloadIcon from "assets/images/icons/cloud@2x.png";
import clockIcon from "assets/images/icons/time@2x.png";
import deviceIcon from "assets/images/icons/mobile@2x.png";
import filledHeart from "assets/images/icons/filled-heart.svg";
import outlinedHeart from "assets/images/icons/outlined-heart.svg";
import { setUser } from "reducers/auth";
import { setUserEnrollments } from "reducers/courses";
import playIcon from "assets/images/play-now-icon.png";
import inifiniteIcon from "assets/images/infinite.jpg";
import listItemIcon from "assets/images/list-item-icon.svg";
import breakpoint from "styled-components-breakpoint";
import service from "services";
import { strToSlug, isObject, getLowestPriceFromPlans } from "utils/common";
import Vimeo from "@vimeo/player";
import Modal from "components/Modal";
import RandomSuggestions from "./RandomSuggestions";
import Header from "./Header";
import { WIDTH_SIZES, INGLES_PDN_ID } from "constants";
import {
  Container,
  CourseInfoContainer,
  TeacherName,
  CourseNameContainer
} from "./styles";
import "../../styles.scss";
import { SET_USER_ENROLLMENTS } from "../../../../reducers/courses";
import {
  addToWishlist,
  removeFromWishlist
} from "../../../../reducers/wishlist";

const { md, lg } = WIDTH_SIZES;
const { pushRoute } = Router;
const UNIVERSITY_PUPC_ID = 8;

class TeacherCard extends Component {
  state = {
    fixedConfig: {},
    showHelperVideoModal: false,
    addedToWishList: false,
    loadingFreeze: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setTeacherCardFixed();
  }

  toggleWishList = addedToWishList => {
    const {
      token,
      history,
      addWishlist,
      removeWishlist,
      course,
      wishlistItems
    } = this.props;

    if (!token) {
      pushRoute(`/${service.getCountry().countryCode}/login`);
    }

    const foundCourse = wishlistItems.find(({ id }) => id === course.id);

    if (!addedToWishList) {
      addWishlist(course);
    } else {
      removeWishlist(foundCourse);
    }
  };

  setTeacherCardFixed = () => {
    const windowMaxWidth = window.innerWidth;

    this.setState({
      fixedConfig: {
        position: "absolute",
        right: "0",
        top: "-20px"
      }
    });

    const sideMargins = windowMaxWidth - lg;
    const oneSideMargin = sideMargins / 2;
    const footerHeight = 578;
    const fixedLimitSize = 600;
    const teacherCardHeight = 529;
    const extraValue = 200;

    document.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const windowMaxHeight = document.body.clientHeight;

      if (windowMaxWidth >= md) {
        const positionRight =
          sideMargins <= 0 ? "55px" : `${Math.round(oneSideMargin) + 65}px`;

        if (scrollPosition > 100) {
          this.setState({
            fixedConfig: {
              position: "fixed",
              right: `${windowMaxWidth > lg ? positionRight : "65px"}`,
              top: "5px"
            }
          });
        }

        if (windowMaxHeight - footerHeight - fixedLimitSize <= scrollPosition) {
          this.setState({
            fixedConfig: {
              position: "absolute",
              right: "0",
              top: `${windowMaxHeight -
                footerHeight -
                teacherCardHeight -
                extraValue}px`
            }
          });
        }

        if (scrollPosition < 100) {
          this.setState({
            fixedConfig: {
              position: "absolute",
              right: "0",
              top: "-20px"
            }
          });
        }
      }
    });
  };

  setUrl = async (course, params, token) => {
    const { slug, id, university } = course;
    const { userEnrollment, activities } = this.props;
    let lessonOrSubjectId = "";
    let subjectSlug = "";
    if (params) {
      const courseLessons = course.markers.data.reduce((prev, curr) => {
        return [...prev, ...curr.lessons];
      }, []);

      const lessonsAvailable =
        !userEnrollment.length > 0 ? courseLessons : userEnrollment;
      if (lessonsAvailable.length > 0) {
        let currentLesson = lessonsAvailable[0];
        let activitySubject;

        if (isObject(activities)) {
          currentLesson = lessonsAvailable.find(
            ({ id }) => id == activities.lesson_id
          );

          currentLesson = courseLessons.find(e => e.id == currentLesson.id);

          activitySubject = currentLesson.subjects.find(
            ({ id }) => activities.subject_id == id
          );
        }

        currentLesson = courseLessons.find(e => e.id == currentLesson.id);

        const { id: lessonId, subjects } = currentLesson;
        const currentSubject = activitySubject || subjects[0];
        subjectSlug = `${strToSlug(currentSubject.name)}/`;
        lessonOrSubjectId = `/${lessonId}/${currentSubject.id}`;
      }
      const universitySlug = strToSlug(university.data.short_name);
      pushRoute(
        `/${
          service.getCountry().countryCode
        }/player/${universitySlug}/${slug}/${subjectSlug}${id}${lessonOrSubjectId}`
      );
    }
  };

  toggleModal() {
    const { showHelperVideoModal } = this.state;

    const player = new Vimeo(this.player);

    if (!showHelperVideoModal) {
      player.play();
    } else {
      player.pause();
    }

    this.setState({ showHelperVideoModal: !showHelperVideoModal });
  }

  unfreeze = async () => {
    const {
      course,
      params,
      token,
      user,
      setUserToState,
      setUserEnrollmentsToState
    } = this.props;

    this.setState({
      loadingFreeze: true
    });

    const response = await service.unfreeze(token);

    if (response.status === 500) {
      this.setState({
        errorOnFreeze: true
      });
    } else {
      const data = await service.getUserAccess(token);

      setUserEnrollmentsToState(data);
      setUserToState(Object.assign({}, user, { access_type: "subscribed" }));
      this.setUrl(course, params, token);
    }

    this.setState({
      loadingFreeze: false
    });
  };

  renderLabel = () => {
    const { course, isAccountFreezed, plans, user } = this.props;

    if (user && user.subscription) {
      return <div />;
    }

    const { formatted_price_per_lesson: formattedPricePerLesson } = course;

    const isPUPC = user && user.university_id === UNIVERSITY_PUPC_ID;

    const priceToShow =
      formattedPricePerLesson !== null
        ? formattedPricePerLesson
        : getLowestPriceFromPlans(plans, !isPUPC);

    if (course && course.is_free) {
      return (
        <div>
          <span>Curso</span>
          <p className="courses-teacher-price">Gratis</p>
        </div>
      );
    }

    if (isAccountFreezed) {
      return <div />;
    }

    return (
      <div>
        <span className="since-price">
          {course.individual_lessons ? "Clases desde " : "Planes desde "}
        </span>
        <p className="courses-teacher-price">
          <span className="courses-price-currency">
            {service.getCountry().currencySymbol}
          </span>
          <span>{priceToShow}</span>
          <span style={{ fontSize: "16px" }}>/ mensuales</span>
        </p>
      </div>
    );
  };

  renderButton = () => {
    const {
      course,
      acquired,
      params,
      token,
      isAccountFreezed,
      activities,
      user
    } = this.props;

    const isInglesPdn = course.id == INGLES_PDN_ID;

    if ((acquired || course.is_free) && !course.release_date) {
      return (
        <div>
          <LargeButton
            large
            style={{ height: 45 }}
            handleClick={() => this.setUrl(course, params, token)}
          >
            {isObject(activities) ? "Reanudar" : "Empezar el curso"}
          </LargeButton>
          {user && user.access_type === "subscribed" ? (
            <div />
          ) : (
            <Button
              style={{
                background: "#87E400",
                fontWeight: 900,
                fontSize: 18,
                marginTop: 16,
                height: 45
              }}
              onClick={() =>
                pushRoute(
                  `/${service.getCountry().countryCode}/planes/${course.id}`
                )
              }
            >
              {user ? "Mejora tu Plan" : "Vuélvete Premium"}
            </Button>
          )}
        </div>
      );
    }

    if (isAccountFreezed) {
      return (
        <Button
          styleClass="is-blue course-buy-button"
          style={{ fontSize: 18 }}
          onClick={() => this.unfreeze()}
        >
          {this.state.loadingFreeze ? "Descongelando" : "Descongelar"}
        </Button>
      );
    }

    return (
      <CustomLink
        path={isInglesPdn ? "/paquetes/pagar" : `/planes/${course.id}`}
      >
        <Button
          style={{
            background: "#87E400",
            fontSize: "18px",
            fontWeight: 900,
            height: 45
          }}
          onClick={() => {
            mixpanel.track("View packages", { name: course.name });
          }}
        >
          {isInglesPdn ? "Comprar" : "Vuélvete Premium"}
        </Button>
      </CustomLink>
    );
  };

  render() {
    const { fixedConfig, showHelperVideoModal } = this.state;
    const {
      showBar,
      course,
      acquired,
      params,
      token,
      activities,
      user
    } = this.props;

    const { teacher } = course;

    const hasTeacher = teacher && teacher.data;

    return (
      <Container>
        <div className="courses-teacher-top">
          <Header
            courseName={course.name}
            isPremium={!course.is_free}
            universityColor={
              course.university ? course.university.data.color : "#000"
            }
            universityName={
              course.university.data.name.length > 30
                ? course.university.data.short_name
                : course.university.data.name
            }
          />
          <CourseInfoContainer>
            <div className="courses-teacher-info-wrapper">
              <img
                alt="teacher icon"
                src={hasTeacher.avatar || teacherProfile}
                className="courses-teacher-profile"
              />
              <div className="courses-teacher-info">
                <TeacherName>
                  {hasTeacher && `con ${teacher.data.name}`}
                </TeacherName>
                <TeacherName isMobile>
                  {hasTeacher &&
                    `con ${teacher.data.name.slice(
                      0,
                      teacher.data.name.indexOf(" ")
                    )}`}
                </TeacherName>
                <TeacherStar teacher={hasTeacher ? teacher.data : {}} />
              </div>
            </div>
            <div className="courses-teacher-price-wrapper">
              {this.renderLabel()}
            </div>
          </CourseInfoContainer>
          <div style={{ marginTop: 10 }}>{this.renderButton()}</div>
        </div>
        <div className="courses-teacher-bottom">
          <div className="courses-package-info-wrapper">
            {user && user.access_type === "subscribed" ? (
              <RandomSuggestions />
            ) : (
              <div>
                <p className="include-text">Vuélvete Premium y obtén:</p>
                <div className="courses-package-item">
                  <div className="courses-package-icon-wrapper">
                    <img
                      alt="video icon"
                      src={listItemIcon}
                      className="courses-package-icon"
                    />
                  </div>
                  Acceso Ilimitado
                </div>
                <div className="courses-package-item">
                  <div className="courses-package-icon-wrapper">
                    <img
                      alt="video icon"
                      src={listItemIcon}
                      className="courses-package-icon"
                    />
                  </div>
                  Quizzes con resultados
                </div>
                <div className="courses-package-item">
                  <div className="courses-package-icon-wrapper">
                    <img
                      alt="video icon"
                      src={listItemIcon}
                      className="courses-package-icon"
                    />
                  </div>
                  Preguntas al profesor
                </div>
                <div className="courses-package-item">
                  <div className="courses-package-icon-wrapper">
                    <img
                      alt="book icon"
                      src={listItemIcon}
                      className="courses-package-icon"
                    />
                  </div>
                  Soporte al Cliente
                </div>
                <div className="courses-package-item">
                  <div className="courses-package-icon-wrapper">
                    <img
                      alt="download icon"
                      src={listItemIcon}
                      className="courses-package-icon"
                    />
                  </div>
                  Sin interrupciones por anuncios
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="courses-teacher-floating-bar"
          style={{ display: showBar ? "flex" : "none" }}
        >
          <div className="courses-bar-content">
            {course.is_free ? (
              <div className="courses-teacher-price-bar-wrapper">
                <span>Curso</span>
                <p className="courses-teacher-price courses-is-bar">Gratis</p>
              </div>
            ) : (
              <div className="courses-teacher-price-bar-wrapper">
                <span>
                  {course.individual_lessons ? "Clases desde " : "Desde "}
                </span>
                <span className="courses-teacher-price courses-is-bar">
                  {`${service.getCountry().currencySymbol} ${
                    course.formatted_price_per_lesson
                  }`}
                </span>
              </div>
            )}
          </div>
          <div className="courses-bar-button-wrapper">
            {(acquired || course.is_free) && !course.release_date ? (
              <Button
                styleClass="is-blue course-buy-button"
                style={{
                  height: 45,
                  fontWeight: 900
                }}
                onClick={() => this.setUrl(course, params, token)}
              >
                {isObject(activities) ? "Reanudar" : "Empezar el curso"}
              </Button>
            ) : (
              <CustomLink path={`/planes/${course.id}`}>
                <Button
                  styleClass="is-blue"
                  onClick={() => {
                    mixpanel.track("View packages", { name: course.name });
                  }}
                >
                  Elige tu paquete
                </Button>
              </CustomLink>
            )}
          </div>
        </div>

        <Modal
          active={showHelperVideoModal}
          extraLarge
          hideClose={false}
          handleClose={() => this.toggleModal()}
        >
          <div style={{ padding: "49.58% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/294718419?color=0FA3F4&title=0&byline=0&portrait=0"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%"
              }}
              id="howToBuy"
              frameBorder="0"
              webkitallowfullscreen
              title="HowToBuy"
              mozallowfullscreen
              allowFullScreen
              ref={player => {
                this.player = player;
              }}
            />
          </div>
        </Modal>
      </Container>
    );
  }
}

const TeacherCardWithRouter = withRouter(TeacherCard);

const mapDispatchToProps = {
  addWishlist: item => addToWishlist(item),
  removeWishlist: item => removeFromWishlist(item),
  setUserToState: user => setUser(user),
  setUserEnrollmentsToState: data => setUserEnrollments(data)
};

const mapStateToProps = ({ wishlist, auth }) => {
  return {
    wishlistItems: wishlist.items,
    token: auth.token,
    user: auth.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherCardWithRouter);
