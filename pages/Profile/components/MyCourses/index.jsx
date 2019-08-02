import React, { Fragment } from "react";
import { CustomLink, TitleSection, Label } from "components";
import CourseGrid from "components/CourseGrid";
import Button from "components/Button";
import { connect } from "react-redux";
import "../../styles.scss";
import { SectionTitle } from "../Subscription/styles";
import { setUnFreezeModal } from "reducers/auth";
import { SuperFlyingGuyShape, SuperFlyingGuy } from "../Subscription/styles";

const getFilteredCourses = (courses, userEnrollments, inProgress) =>
  courses.filter(course =>
    userEnrollments.find(({ course_id: courseId, activities }) =>
      inProgress
        ? course.id === courseId && !Array.isArray(activities)
        : course.id === courseId && Array.isArray(activities)
    )
  );

const emptyCourses = (
  <div className="empty">
    <span className="empty-title">Aún no tienes cursos</span>
    <span className="empty-content">
      {
        "No te quedes sin ver tus cursos, cómpralos y prepárate para tus examenes"
      }
    </span>
    <CustomLink className="button-wrapper" path="/cursos/">
      <Button>Mira los cursos</Button>
    </CustomLink>
  </div>
);

const renderButton = (setUnFreezeModal, isAccountFreezed) => {
  if (isAccountFreezed) {
    return (
      <Button
        style={{ marginBottom: "360px", width: "225px" }}
        onClick={() => setUnFreezeModal(true)}
      >
        <Label color="#fff" weight="black" fontSize="20px" isClickable>
          Descongelar
        </Label>
      </Button>
    );
  }

  return (
    <CustomLink path="/suscripcion">
      <Button style={{ marginBottom: "360px", width: "225px", height: 45 }}>
        <Label color="#fff" weight="black" fontSize="20px" isClickable>
          Vuélvete Premium
        </Label>
      </Button>
    </CustomLink>
  );
};

const MyCourses = ({
  courses,
  history,
  userEnrollments,
  user,
  setUnFreezeModal
}) => {
  const inProgressCourses = getFilteredCourses(courses, userEnrollments, true);
  const unseenCourses = getFilteredCourses(courses, userEnrollments, false);

  return (
    <div>
      {inProgressCourses.length > 0 && (
        <Fragment>
          <div style={{ fontWeight: 900, padding: "14px 0px" }}>
            <p>Cursos en progreso</p>
          </div>
          <CourseGrid courseList={inProgressCourses} history={history} />
        </Fragment>
      )}
      {unseenCourses.length > 0 && (
        <Fragment>
          <div style={{ fontWeight: 900, padding: "14px 0px" }}>
            <p>Cursos disponibles</p>
          </div>
          <CourseGrid courseList={unseenCourses} history={history} />
        </Fragment>
      )}
      {unseenCourses.length === 0 && inProgressCourses.length === 0 && user && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px 10px"
          }}
        >
          <TitleSection
            title={
              user.access_type === "freezed"
                ? "Tu cuenta está congelada"
                : "Todos tus cursos cuando quieras"
            }
            extraTitle
            style={{ maxWidth: "395px" }}
          />
          <Label
            fontSize="14px"
            color="#626262"
            textAlign="right"
            marginRight="auto"
            marginBottom="20px"
          >
            <div>
              <p>
                {user.access_type === "freezed"
                  ? "Descongela y sigue aprendiendo"
                  : "Suscríbete ahora y aprende a tu ritmo"}
              </p>
              <br />
            </div>
          </Label>
          {renderButton(setUnFreezeModal, user.access_type === "freezed")}
          <SuperFlyingGuyShape />
          <SuperFlyingGuy />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ courses, auth }) => ({
  user: auth.user,
  userEnrollments: courses.userEnrollments
});

const mapDispatchToProps = {
  setUnFreezeModal: bool => setUnFreezeModal(bool)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCourses);
