import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import CategoryFilter from "components/CategoryFilter";
import TeachersFilter from "components/TeachersFilter";
import UniversityFilter from "components/UniversityFilter";
import CourseGrid from "components/CourseGrid";
import PaginatorContainer from "components/PaginatorContainer";
import FiltersModal from "components/FiltersModal";
import Loader from "components/Loader";
import service from "services";
import { getUrlParams, getLowestPriceFromPlans } from "utils/common";
import InfiniteScroll from "react-infinite-scroll-component";
import { Router } from "routes";
import "./styles.scss";

const { pushRoute } = Router;

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return isMetadataObject && planSelected.metadata.is_featured === "true";
};

class Search extends PureComponent {
  state = {
    activeFilters: "",
    courses: [],
    activePage: 1,
    coursesNumber: 0,
    hasNext: false,
    currentUniversity: "",
    loadingActive: false,
    loadingCourses: true,
    universities: [],
    universityList: [],
    universitySelected: null,
    categorySelected: "",
    teachersFilter: [],
    teachers: [],
    teachersList: [],
    filterModalActive: false,
    search: false,
    query: "",
    plans: [],
    loadPlan: false
  };

  componentWillMount() {
    const { router } = this.props;
    const { query } = getUrlParams(router.asPath);

    this.loadPlans();
    this.loadUniversities();
    this.loadCourses(false, 1, null, null, null, query);
  }

  componentWillReceiveProps(nextProps) {
    const { query } = getUrlParams(nextProps.router.asPath);
    this.loadCourses(false, 1, null, null, null, query);
  }

  onMoreTeachersClick = () => {
    const { teachers, teachersList } = this.state;

    if (teachersList.length > 5) {
      this.setState({
        teachersList: teachers.slice(0, 5)
      });
    } else {
      this.setState({
        teachersList: teachers
      });
    }
  };

  onMoreUniClick = () => {
    const { universities, universityList } = this.state;

    if (universityList.length > 5) {
      this.setState({
        universityList: universities.slice(0, 5)
      });
    } else {
      this.setState({
        universityList: universities
      });
    }
  };

  onTeacherFilterSelect = teachersFilter => {
    this.setState({ teachersFilter });
    this.loadCourses(false, 1, null, null, teachersFilter);
  };

  onCategoryFilterSelect = value => {
    const categorySelected = value ? parseInt(value, 10) : value;

    this.setState({ categorySelected });
    this.loadCourses(false, 1, null, categorySelected);
  };

  onUniversityFilterSelect = selected => {
    let uniSelected = "";

    if (selected) {
      if (selected.target) {
        uniSelected = selected.target.value === "" ? "" : selected;
      } else {
        uniSelected = selected;
      }
    }

    const universitySelected = uniSelected
      ? parseInt(
          uniSelected.target ? uniSelected.target.value : uniSelected,
          10
        )
      : uniSelected;

    this.setState({ universitySelected, teachersFilter: [] });
    this.loadCourses(false, 1, universitySelected, null, []);
    this.loadTeachers(universitySelected);
  };

  loadPlans = async () => {
    try {
      this.setState({ loadPlan: true });
      const response = await service.getPlans();
      const activePlans = response.data
        .filter(e => e.active)
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }))
        .slice(0, 3);

      this.setState({ plans: activePlans });
    } catch (err) {
      return err;
    } finally {
      this.setState({ loadPlan: false });
    }
  };

  loadCourses = async (
    scroll = false,
    page,
    universityId,
    categoryId,
    teacherIdArray,
    query
  ) => {
    const {
      universitySelected,
      categorySelected,
      courses,
      teachersFilter,
      activePage,
      universities,
      hasNext
    } = this.state;

    if (scroll) {
      page = activePage + 1;
    } else {
      this.setState({ loadingCourses: true });
    }

    const { token, router } = this.props;

    if (!scroll) {
      this.setState({ loadingCourses: true });
    }

    let uniId =
      universityId || universityId === "" ? universityId : universitySelected;
    const catId =
      categoryId || categoryId === "" ? categoryId : categorySelected;
    const actualQuery = query || getUrlParams(router.asPath).query;

    const universityShortName = getUrlParams(router.asPath).university;
    if (!universityId && universityShortName) {
      const searchedUniversity = universities.find(
        ({ short_name }) =>
          short_name.toLowerCase() === universityShortName.toLowerCase()
      );
      uniId = searchedUniversity ? searchedUniversity.id : uniId;
      this.loadTeachers(uniId);
    }

    try {
      const response = await service.getCourses(
        page,
        uniId,
        catId,
        teacherIdArray || teachersFilter,
        actualQuery,
        token
      );

      this.setState({ loadingCourses: false });

      if (response) {
        const hasData = response.data.length && universityId;
        const currentName = hasData
          ? response.data[0].university_name
          : "Todas las universidades";
        const currentColor = hasData
          ? response.data[0].university_color
          : "#363636";

        let coursesToShow = [];

        if (scroll) {
          coursesToShow = courses;
          coursesToShow.push(...response.data);
        } else {
          coursesToShow = response.data;
        }

        const hasNextData = response.meta.pagination.links.next !== undefined;

        this.setState({
          courses: coursesToShow,
          hasNext: hasNextData,
          currentUniversity: {
            name: currentName,
            color: currentColor
          },
          coursesNumber: response.meta.pagination.total,
          activePage: page,
          query: actualQuery,
          universitySelected: uniId
        });
      }
    } catch (error) {
      throw error;
    }
  };

  loadUniversities = async () => {
    const { token } = this.props;
    this.setState({ loadingActive: true });

    try {
      const response = await service.getUniversities(null, token);

      this.setState({ loadingActive: false });

      if (response.data) {
        this.setState({
          universities: response.data,
          universityList: response.data.slice(0, 5)
        });

        this.onUniversityFilterSelect("");
      }
    } catch (error) {
      throw error;
    }
  };

  loadTeachers = async university => {
    this.setState({ loadingActive: true });
    if (university) {
      try {
        const response = await service.getTeachers(university);

        this.setState({ loadingActive: false });

        if (response) {
          this.setState({
            teachers: response,
            teachersList: response.slice(0, 5)
          });
        }
      } catch (error) {
        throw error;
      }
    } else {
      this.setState({ teachers: [] });
    }
  };

  toggleFilterModal = () =>
    this.setState({ filterModalActive: !this.state.filterModalActive });

  applyFilters = (categorySelected, teachersFilter) => {
    this.setState({ categorySelected, teachersFilter });
    this.loadCourses(false, 1, null, categorySelected, teachersFilter);
    this.toggleFilterModal();
  };

  cleanTeachersSelected = () => {
    this.setState({ teachersFilter: [] });
    this.loadCourses(false, 1, null, null, []);
  };

  renderSearchResult = () => {
    const {
      loadingCourses,
      courses,
      coursesNumber,
      activePage,
      query,
      plans,
      loadPlan,
      hasNext
    } = this.state;
    const {
      router: { asPath }
    } = this.props;

    if (asPath.substring(7) === "") {
      return pushRoute(`/${service.getCountry().countryCode}/cursos/`);
    }

    if (loadingCourses || loadPlan) {
      return {
        header: "",
        content: (
          <div className="search-empty">
            <Loader visibility={loadingCourses} />
          </div>
        )
      };
    }

    if (courses && courses.length) {
      return {
        header: (
          <span>
            {`Se ${
              coursesNumber > 1 ? "encontraron" : "encontró"
            } ${coursesNumber}
            resultado${coursesNumber > 1 ? "s" : ""} para "${query}"`}
          </span>
        ),
        content: (
          <InfiniteScroll
            dataLength={courses.length}
            next={() => this.loadCourses(true)}
            hasMore={hasNext}
            scrollThreshold={0.5}
          >
            <CourseGrid courseList={courses} />
          </InfiniteScroll>
        )
      };
    }

    return {
      header: <span>{`No se encontraron resultados para "${query}"`}</span>,
      content: (
        <div className="search-not-found">
          <span className="search-not-found-title">Te damos unas ideas:</span>
          <ul className="search-not-found-list">
            <li>Asegúrate de que tu búsqueda esté escrita correctamente</li>
            <li>Intenta con otros términos</li>
            <li>Selecciona tu universidad en el filtro</li>
          </ul>
        </div>
      )
    };
  };

  render() {
    const {
      courses,
      coursesNumber,
      universityList,
      teachersList,
      universitySelected,
      teachersFilter,
      categorySelected,
      teachers,
      universities,
      filterModalActive,
      activePage,
      query,
      loadingCourses
    } = this.state;

    const filterModalProps = {
      active: filterModalActive,
      closeModal: this.toggleFilterModal,
      onApplyFilters: this.applyFilters,
      teachers
    };
    const searchResult = this.renderSearchResult();

    return (
      <div className="search-container">
        <div className="search-page-wrapper">
          <div className="search-courses">
            <div>
              {query && (
                <div className="search-user-title">
                  {searchResult && searchResult.header}
                </div>
              )}

              {searchResult && searchResult.content}
            </div>
          </div>
          <FiltersModal {...filterModalProps} />
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
