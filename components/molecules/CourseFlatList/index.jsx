import React, { Component, Fragment } from "react";
import services from "services";
import { Button, Label, TitleSection, LargeButton } from "components";
import Select from "components/Select";
import { Twemoji } from "react-emoji-render";
import arrowImg from "assets/images/arrow.svg";
import listItemIcon from "assets/images/list-item-icon.svg";
import { CourseGrid, UniversitySelect } from "./styles";

class CourseFlatList extends Component {
  state = {
    universities: [],
    courses: [],
    selectedUniversityId: null
  };

  componentDidMount() {
    this.loadUniversities();
  }

  loadUniversities = async () => {
    const { defaultSelectedUniversityId } = this.props;
    const { data: universities } = await services.getUniversities();

    this.setState({ universities });

    this.loadCourses(defaultSelectedUniversityId);
  };

  loadCourses = async selectedUniversityId => {
    const { data: courses } = await services.getCoursesByUniversityId(
      selectedUniversityId
    );
    this.setState({ courses });
  };

  handleSelectChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({ selectedUniversityId: value });
    this.loadCourses(value);
  };

  render() {
    const { universities, courses, selectedUniversityId } = this.state;
    const {
      defaultSelectedUniversityId,
      title,
      callToActionTitle,
      callToAction,
      noArrow,
      noSelect,
      noDash,
      noActionButton
    } = this.props;

    return (
      <div
        id="courses-included"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "20px 0px 60px 0px"
        }}
      >
        <div style={{ maxWidth: "900px", position: "relative" }}>
          <TitleSection
            title={
              title || (
                <Fragment>
                  ¿Qué esperas para romperla en
                  <b
                    style={{
                      color: "#0fa3f4",
                      fontWeight: "900",
                      margin: "0 5px"
                    }}
                  >
                    todos estos cursos
                  </b>
                  <Twemoji text=" 💯" />?
                </Fragment>
              )
            }
            paddingBottom="40px"
            paddingTop="33px"
            noDash={noDash}
          />
          {!noArrow && (
            <img
              src={arrowImg}
              width="57"
              height="65"
              alt="arrow"
              style={{
                position: "absolute",
                top: 83,
                right: 67
              }}
            />
          )}
          {!noSelect && (
            <UniversitySelect>
              <p style={{ fontWeight: 600, marginRight: 10, paddingBottom: 7 }}>
                Soy de la...
              </p>
              <Select
                id="university"
                handleChange={e => this.handleSelectChange(e)}
                value={selectedUniversityId || defaultSelectedUniversityId}
                placeholder="Selecciona tu universidad"
                items={universities}
                style={{ minWidth: "250px" }}
              />
            </UniversitySelect>
          )}
          <CourseGrid>
            {courses.map(e => (
              <div style={{ display: "flex", alignItems: "center" }} key={e.id}>
                <div style={{ marginRight: 12 }}>
                  <img
                    style={{ paddingBottom: 1 }}
                    src={listItemIcon}
                    alt="listicon"
                  />
                </div>
                <div>{e.name}</div>
              </div>
            ))}
          </CourseGrid>
          {!noActionButton && (
            <div style={{ textAlign: "center", marginTop: 60 }}>
              {callToActionTitle || (
                <p
                  style={{
                    fontWeight: 900,
                    fontSize: "22px",
                    color: "#626262"
                  }}
                >
                  <Twemoji text="Y disfruta de las ventajas de estudiar desde casa 👊" />
                </p>
              )}
              <Button
                large
                style={{ background: "#87E400", margin: "20px auto" }}
                onClick={() => {
                  document.querySelector("#precios").scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                  });
                }}
              >
                <Label color="#fff" weight="black" fontSize="20px" isClickable>
                  {callToAction || "Ver beneficios Premium"}
                </Label>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CourseFlatList;
