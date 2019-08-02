import React, { Component, Fragment } from "react";
import { TitleSection, Price, LargeButton } from "components";
import services from "services";
import Select from "components/Select";
import { Router } from "routes";
import { Twemoji } from "react-emoji-render";
import { MainTitle } from "./styles";

export default class PackageSelector extends Component {
  state = {
    courses: [],
    universities: [],
    packages: [],
    selectedCourse: null,
    selectedUniversity: null,
    selectedPackage: null
  };

  componentDidMount() {
    this.setState({
      selectedUniversity: this.props.defaultUniversity
    });
    this.loadUniversities();
  }

  loadUniversities = async () => {
    const { defaultUniversity } = this.props;
    const { data: universities } = await services.getUniversities();

    this.setState({ universities });

    this.loadCourses(defaultUniversity);
  };

  loadCourses = async selectedUniversityId => {
    const { data: courses } = await services.getCoursesByUniversityId(
      selectedUniversityId
    );

    this.setState({ courses });

    if (courses.length > 0) {
      this.loadPackagesByCourse(courses[0].id);
    }
  };

  loadPackagesByCourse = async courseId => {
    const { data: packages } = await services.getPackages(courseId, true);
    const { onChange } = this.props;

    if (packages.length > 0) {
      onChange(packages[0]);
      this.setState({ selectedPackage: packages[0] });
    } else {
      onChange(null);
      this.setState({ selectedPackage: null });
    }
  };

  handleCourseChange = value => {
    this.loadPackagesByCourse(value);

    this.setState({
      selectedCourse: value
    });
  };

  handleUniversityChange = value => {
    this.setState({
      selectedUniversity: value
    });

    this.loadCourses(value);
  };

  render() {
    const {
      universities,
      courses,
      selectedUniversity,
      selectedCourse,
      selectedPackage
    } = this.state;
    return (
      <div
        id="paquetes"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "20px 0px 60px 0px"
        }}
      >
        <TitleSection
          title={
            <Fragment>
              <h1 style={{ fontSize: "22px", fontWeight: 900 }}>
                ESCOGE TU SEMINARIO Y EMPIEZA A
                <b
                  style={{
                    color: "#0fa3f4",
                    fontWeight: "900",
                    margin: "0 5px"
                  }}
                >
                  ESTUDIAR
                </b>
                <Twemoji text="🤟" />
              </h1>
            </Fragment>
          }
          paddingBottom="13px"
          paddingTop="33px"
          textAlign="center"
          noDash
        />
        <div style={{ margin: "30px 0px" }}>
          <div
            style={{
              borderRadius: "10px",
              padding: 20,
              // border: '1px solid #d1d1d1',
              boxShadow: "0px 0px 7px 0px rgba(176,176,176,0.81)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <MainTitle>Seminarios por curso</MainTitle>
            {/* <Price amountToShow={10900} /> */}
            <p style={{ textAlign: "left", color: "#727272" }}>
              Selecciona tu universidad y curso para el que quieres el
              seminario.
            </p>
            <p style={{ textAlign: "left", color: "#727272", marginTop: 9 }}>
              Acceso hasta el día de tu evaluación.
            </p>
            <div style={{ padding: "10px 0px" }}>
              <Select
                id="courses"
                label="Universidad"
                handleChange={e => this.handleUniversityChange(e.target.value)}
                value={selectedUniversity}
                placeholder="Selecciona tu universidad"
                items={universities}
              />
              <Select
                id="courses"
                label="Curso"
                handleChange={e => this.handleCourseChange(e.target.value)}
                value={selectedCourse}
                placeholder="Selecciona el curso"
                items={courses}
              />
            </div>
            <div style={{ padding: "10px 0px" }}>
              {!selectedPackage && (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#DF5E43"
                  }}
                >
                  No hay seminarios para este curso
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
