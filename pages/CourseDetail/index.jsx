import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Affix } from "antd";
import {
  getAcquiredLesson,
  lessonsAndSubjectsAvailable,
  avoidUrlParams,
  getUrlParams
} from "utils/common";
import Markers from "components/LessonsList/Markers";
import Quiz from "components/Quiz";
import TeacherInformation from "components/TeacherInformation";
import PageLoader from "components/PageLoader";
import { CourseReview, CustomAffix } from "components";
import Media from "react-media";
import facebookPixel from "utils/facebook";
import moment from "moment";
import { Router } from "routes";
import Switch from "react-ios-switch";
import service from "services";
import TeacherCard from "./components/TeacherCard/index";
import "./styles.scss";
import Banner from "components/OfferBanner";
import { setCouponCode } from "reducers/coupons";
import ComingSoonBanner from "./components/ComingSoonBanner";
import { ClassHeaderContainer, SortContainer, SortLabel } from "./styles";
import Header from "./components/Header";

const AboutTeacher = ({ universityName, reviews, teacher }) => (
  <div className="courses-about-teacher-wrapper">
    <div>
      <CourseReview reviews={reviews} universityName={universityName} />
      <TeacherInformation teacher={teacher} />
    </div>
  </div>
);

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return isMetadataObject && planSelected.metadata.is_featured === "true";
};

class Detail extends Component {
  state = {
    course: null,
    acquired: false,
    userEnrollment: {},
    lessonsSorted: true,
    renderTeacherCard: {
      top: null,
      bottom: null
    },
    activeModal: false,
    quiz: {},
    suggestions: [],
    plans: [],
    loadingCourse: true
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.loadPlans();
    const { userEnrollments, token, router, setDiscountCoupon } = this.props;

    const {
      ref_coupon: discountCoupon,
      utm_source: utmSource,
      utm_medium: utmMedium
    } = getUrlParams(router.asPath);

    if (discountCoupon) {
      setDiscountCoupon({
        code: discountCoupon,
        source: utmSource || "direct",
        medium: utmMedium
      });
    }

    let acquiredLessons = [];

    let userEnrollment = [];
    const courseId = avoidUrlParams(router.asPath);

    if (token) {
      userEnrollment = userEnrollments.find(
        course => course.course_id === Number(courseId)
      );

      if (userEnrollment) {
        acquiredLessons = userEnrollment.acquired_lessons.data;
      }
    }

    this.setState(
      {
        userEnrollment: acquiredLessons,
        activities: (userEnrollment && userEnrollment.activities) || []
      },
      () => this.loadCourse(courseId)
    );
  }

  getSuggestionLink = ({ questions }) => {
    const {
      course: {
        data: {
          id,
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
        lesson => lesson.id === suggestion.lesson_id
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
        subjectId: suggestion && suggestion.subject_id,
        subjectName: subjectFound && subjectFound.name,
        subjectSlug: subjectFound && subjectFound.slug,
        time: suggestion && suggestion.time
      });
    });

    return suggestions;
  };

  // toggleSort = lessonsSorted => {
  //   const { course } = this.state;

  //   const markers = course.data.markers.data;

  //   if (markers.length > 0) {
  //     if (markers.end_date) {
  //       markers.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
  //     }

  //     let newMarkers = {};

  //     if (lessonsSorted) {
  //       const currentMarker =
  //         markers.find(marker => moment(marker.end_date).isAfter()) ||
  //         markers[markers.length - 1];

  //       console.log(currentMarker);

  //       newMarkers[currentMarker.name] = markers.data[currentMarker.name];

  //       delete markers.data[currentMarker.name];

  //       newMarkers = { ...newMarkers, ...markers.data };
  //     } else {
  //       markers.forEach(mark => {
  //         newMarkers[mark.name] = markers.data[mark.name];
  //       });
  //     }

  //     course.data.markers.data = newMarkers;

  //     this.setState({ lessonsSorted, course });
  //   }
  // };

  loadPlans = async () => {
    try {
      const response = await service.getInhousePlans();
      const activePlans = response.data
        .filter(e => e.active)
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));

      this.setState({ plans: activePlans });
      this.renderTeacherCard();
    } catch (err) {
      return err;
    }
  };

  loadCourse = async id => {
    const { token } = this.props;
    const { userEnrollment } = this.state;
    try {
      const response = await service.getCourse(id, token);

      if (response.code === 404) {
        return Router.pushRoute("/404");
      }

      let acquired = false;

      const totalLessons = response.data.markers.data.reduce((prev, curr) => {
        return prev + curr.lessons.length;
      }, 0);

      console.log(response.data.markers.data);
      console.log(userEnrollment);

      if (userEnrollment && userEnrollment.length > 0) {
        acquired = totalLessons === userEnrollment.length;
      } else {
        acquired = false;
      }

      let atLeastOneLesson = null;
      userEnrollment.map(enroll => {
        if (!atLeastOneLesson) {
          atLeastOneLesson = response.data.lessons.data.find(
            lesson => lesson.id == enroll.id
          );
        }
      });

      this.setState(
        { course: response.data, acquired, loadingCourse: false },
        () => {
          this.renderTeacherCard();
          // this.toggleSort(true);
          // mixpanel.track("Course detail", {
          //   isUserEnroll: acquired,
          //   name: response.data.name,
          //   isFree: response.data.is_free
          // });
          // facebookPixel.viewContent({
          //   content_ids: [response.data.id],
          //   content_name: "Course detail",
          //   content_type: response.data.name,
          //   contents: [response.data.lessons.data.map(({ name }) => name)],
          //   content_category: response.data.university.data.name,
          //   free: response.data.is_free,
          //   enrolled: !!atLeastOneLesson
          // });
        }
      );
    } catch (err) {
      return err;
    }
  };

  showModalQuiz = (currentQuiz, active) => {
    if (active === false) {
      return this.setState({ activeModal: active });
    }
    const { token } = this.props;
    if (!token) {
      return Router.pushRoute(`/${service.getCountry().countryCode}/login`);
    }
    //const suggestions = this.getSuggestionLink(currentQuiz);
    const suggestions = [];

    this.setState({ suggestions, quiz: currentQuiz, activeModal: active });
  };

  renderTeacherCard = () => {
    const { course, acquired, userEnrollment, activities, plans } = this.state;
    const { user } = this.props;

    if (!course) return;
    const { token } = this.props;
    return (
      <div>
        <Media query="(max-width: 1024px)">
          {matches =>
            matches ? (
              <TeacherCard
                showBar={false}
                course={course}
                acquired={acquired}
                params
                token={token}
                userEnrollment={userEnrollment}
                activities={activities}
                plans={plans}
                isAccountFreezed={user && user.access_type === "freezed"}
              />
            ) : (
              <Affix offsetTop={60}>
                <TeacherCard
                  showBar={false}
                  course={course}
                  acquired={acquired}
                  params
                  token={token}
                  userEnrollment={userEnrollment}
                  activities={activities}
                  plans={plans}
                  isAccountFreezed={user && user.access_type === "freezed"}
                />
              </Affix>
            )
          }
        </Media>
      </div>
    );
  };

  render() {
    const {
      course,
      userEnrollment,
      renderTeacherCard,
      lessonsSorted,
      activeModal,
      quiz,
      suggestions,
      loadingCourse
    } = this.state;
    const { user } = this.props;

    return (
      <div>
        {!course && <PageLoader />}
        {course && (
          <div>
            <Banner course={course} />
            <div style={{ height: 25 }} />
            <Header
              videoUrl={course.url_video}
              rightComponent={this.renderTeacherCard()}
            />
            <div className="course-wrapper-general">
              <div className="course-main-general">
                <div
                  className="course-classes-list-general"
                  id="class-list-course"
                >
                  {course.release_date && (
                    <ComingSoonBanner releaseDate={course.release_date} />
                  )}
                  {course.markers.data[0].lessons.length > 0 && (
                    <ClassHeaderContainer>
                      <h2 className="course-title-general">Lista de Clases</h2>
                      {/* <SortContainer>
                        <SortLabel>Ordenar por próxima práctica</SortLabel>
                        <Switch
                          className="switch-lessons"
                          checked={lessonsSorted}
                          offColor="#d1d3d4"
                          onColor="#1178f2"
                          onChange={checked => console.log(checked)}
                          // onChange={checked => this.toggleSort(checked)}
                        />
                      </SortContainer> */}
                    </ClassHeaderContainer>
                  )}
                  {course.markers ? (
                    <Markers
                      course={course}
                      userEnrollment={userEnrollment}
                      showModalQuiz={this.showModalQuiz}
                      lessonsSorted={lessonsSorted}
                      isAccountFreezed={user && user.access_type === "freezed"}
                      showQuiz
                    />
                  ) : (
                    <div className="courses-empty is-list">
                      {"No se encontraron clases para el curso seleccionado"}
                    </div>
                  )}
                </div>
                <AboutTeacher
                  reviews={course.reviews.data}
                  teacher={course.teacher.data}
                  universityName={course.university.data.name}
                />
              </div>
              <div className="course-aside-general" />
            </div>
          </div>
        )}
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
    );
  }
}

const mapDispatchToProps = {
  setDiscountCoupon: coupon => setCouponCode(coupon)
};

const mapStateToProps = ({ auth, courses }) => ({
  token: auth.token,
  user: auth.user,
  userEnrollments: courses.userEnrollments
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Detail));
