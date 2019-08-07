import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import CourseGrid from 'components/CourseGrid';
import FiltersModal from 'components/FiltersModal';
import facebookPixel from 'utils/facebook';
import Loader from 'components/Loader';
import { getUrlParams, getLowestPriceFromPlans } from 'utils/common';
import service from 'services';
import { Router } from 'routes';
import { setCourses } from 'reducers/progress';
import LoadingCourses from './components/LoadingCourses/index';
import Banner from 'components/OfferBanner';
import { UpdateInfoModal, Filter, Select } from 'components';
import ReferralBanner from 'components/ReferralBanner';
import './styles.scss';
import { clearUserCreated } from 'reducers/register';
import { cleanUserSignIn, setUser } from 'reducers/auth';
import { getUserCourses } from 'reducers/courses';
import { setCouponCode, validateCouponCode } from 'reducers/coupons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { updateRoute } from 'reducers/history';
import filterIcon from 'assets/images/icons/filter_blue.svg';
import {
  CoursesHeaderContainer,
  TitleContainer,
  Title,
  HideOnMobile,
  HideOnDesktop
} from './styles';
import UniversityFilter from '../../components/UniversityFilter';

const { pushRoute } = Router;
const PAGINATION = 24;

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return isMetadataObject && planSelected.metadata.is_featured === 'true';
};

const categories = [
  {
    label: 'Todas',
    value: 0,
  },
  {
    label: 'Nuevos',
    value: 1,
  },
  {
    label: 'Gratis',
    value: 3,
  },
  {
    label: 'Próximamente',
    value: 4,
  }
]

class Courses extends Component {
  state = {
    courses: [],
    coursesNumber: 0,
    activePage: 0,
    hasNext: false,
    currentUniversity: '',
    loadingCourses: false,
    loadingUniversities: false,
    loadingTeachers: false,
    universities: [],
    universityList: [],
    selectedUniversity: '',
    universityDetails: {},
    categorySelected: '',
    categories,
    teachersFilter: '',
    teachers: [],
    teachersList: [],
    userCourses: [],
    filterModalActive: false,
    search: false,
    querySelected: '',
    plans: [],
    showUpdateInfoModal: false,
    query: ''
  };

  componentDidMount() {
    this.loadPlans();
    const {
      userEnrollments,
      getUserAccess,
      setDiscountCoupon,
      router,
      setRoute,
      user,
      token,
      isValidCouponCode
    } = this.props;

    if (user && !user.university_id) {
      this.setState({ showUpdateInfoModal: true });
    }

    const { ref_coupon: discountCoupon, utm_source: utmSource, utm_medium: utmMedium } = getUrlParams(
      router.asPath
    );

    if (discountCoupon) {
      setDiscountCoupon({ code: discountCoupon, source: utmSource || 'direct', medium: utmMedium });
      if (token) {
        isValidCouponCode(discountCoupon, token);
      }
    }

    getUserAccess();
    if (Array.isArray(userEnrollments)) {
      this.setState({
        userCourses: userEnrollments.map(e => e.course.data).reverse()
      });
    }
    facebookPixel.viewContent({
      content_name: 'Courses list'
    });
    mixpanel.track('Home');

    this.loadUniversities();
    setRoute(`/${service.getCountry().countryCode}/cursos`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userEnrollments.length > 0) {
      this.setState({
        userCourses: nextProps.userEnrollments.map(e => e.course.data).reverse()
      });
    }
  }

  onUniversityFilterSelect = university => {
    const selectedUniversity = {
      value: university.id,
      label: university.name,
    }

    this.setState({ selectedUniversity, teachersFilter: '' });
    this.loadTeachers(selectedUniversity.value);
  };

  onCategoryFilterSelect = ({ value }, apply) => {
    this.setState({ categorySelected: value }, () => {
      if(apply) {
        this.onFilter({
          category: value
        });
      }
    });
  };

  handleTeacherChange = (teachersFilter, apply) => {
    this.setState({ teachersFilter }, () => {
      if(apply) {
        this.onFilter({
          teacher: teachersFilter.value
        });
      }
    });
  };

  onFilter = queries => {
    this.loadCourses(queries, false);
  }

  searchCourses = async (page, query) => {
    const { querySelected } = this.state;
    this.setState({ loadingCourses: true });

    try {
      const response = await service.searchCourses(page, query || querySelected);

      this.setState({ loadingCourses: false });

      if (response) {
        this.setState({
          courses: response.data,
          coursesNumber: response.paginator.total,
          activePage: page
        });
      }
    } catch (error) {
      throw error;
    }
  };

  loadUniversities = async () => {
    const { user, token } = this.props;
    const { categorySelected, teachersFilter, selectedUniversity } = this.state;
    this.setState({ loadingUniversities: true });

    const userUniversityId = user ? user.university_id : null;
    try {
      const response = await service.getUniversities(null, token);

      if (response.data) {
        const university = response.data.find(e => e.id === userUniversityId);

        this.setState({
          universities: response.data,
          universityList: response.data.slice(0, 5),
          universityDetails: university,
        }, () => this.loadCourses({
          page: 1,
          university: userUniversityId || selectedUniversity.value,
          category: categorySelected,
          teacher: teachersFilter
        }, false));

        if (university) {
          this.onUniversityFilterSelect(university);
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this.setState({ loadingUniversities: false });
    }
  };

  loadTeachers = async university => {
    this.setState({ loadingTeachers: true });
    if (university) {
      try {
        const response = await service.getTeachers(university);

        this.setState({ loadingTeachers: false });

        if (response) {
          this.setState({
            teachers: response,
            teachersList: response.slice(0, 5)
          });
        }
      } catch (error) {
        throw error;
      }
      this.onFilter({ university });
    } else {
      this.setState({ teachers: [], teachersList: [] });
    }
  };

  toggleFilterModal = () => this.setState({ filterModalActive: !this.state.filterModalActive });

  applyFilters = (categorySelected, teachersFilter, universitySelected) => {
    this.setState({ categorySelected, teachersFilter }, () => {
      this.loadCourses({
        page: 1,
        university: universitySelected,
        category: categorySelected,
        teacher: teachersFilter
      }, false);
    });
    this.toggleFilterModal();
  };

  loadPlans = async () => {
    try {
      const response = await service.getPlans();
      const activePlans = response.data
        .filter(e => e.active)
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));

      this.setState({ plans: activePlans });
    } catch (err) {
      return err;
    }
  };

  loadCourses = async (queries, scroll = false) => {
    const {
      selectedUniversity, categorySelected, courses, activePage
    } = this.state;
    const { token, setCoursesProgress, router } = this.props;

    if (scroll) {
      queries.page = activePage + 1;
    } else {
      this.setState({ loadingCourses: true });
    }

    const path = getUrlParams(router.asPath);
    const actualQuery = path.search || null;

    try {
      const response = await service.getCourses(
        queries.page || 1,
        queries.university || selectedUniversity.value,
        queries.category || categorySelected,
        queries.teacher || null,
        actualQuery,
        token,
        PAGINATION
      );

      /** Calc student progress and save to redux */
      setCoursesProgress();

      if (!scroll) {
        this.setState({ loadingCourses: false });
      }

      if (!response.error) {
        const hasData = response.data.length;
        const currentName = hasData ? response.data[0].university.data.name : 'Todas las universidades';
        const currentColor = hasData ? response.data[0].university.data.color : '#363636';

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
          activePage: queries.page,
          query: actualQuery
        });
      }
    } catch (error) {
      throw error;
    }
  };

  cleanTeachersSelected = () => {
    this.setState({ teachersFilter: '' });
    this.loadCourses(false, 1, null, null, []);
  };

  handleUpdateInfoModalSubmit = async selectedUniversityId => {
    const { user, token, setUpdatedUser } = this.props;
    const response = await service.updateUser(token, selectedUniversityId, user.id);
    if (response.id) {
      setUpdatedUser(response);
    }
    this.setState({ showUpdateInfoModal: false });
  };

  handleUniversityChange = (university, apply = false) => {
    this.loadTeachers(university.value);
    this.setState({
      selectedUniversity: university
    }, () => {
      if(apply) {
        this.onFilter({
          university: university.value
        });
      }
    });
  }

  render() {
    const {
      courses,
      selectedUniversity,
      userCourses,
      teachers,
      universities,
      filterModalActive,
      loadingCourses,
      hasNext,
      plans,
      showUpdateInfoModal,
      query
    } = this.state;

    const { history, token, user } = this.props;

    const filterModalProps = {
      active: filterModalActive,
      closeModal: this.toggleFilterModal,
      onApplyFilters: this.applyFilters,
      teachers
    };

    return (
      <Fragment>
        <Banner />
        {/* <ReferralBanner showBanner={true} isSubscribed={user && user.subscription} loggedIn={token && user} /> */}
        <CoursesHeaderContainer>
          <TitleContainer>
            <Title>
              {selectedUniversity ? selectedUniversity.label : 'Aprendiendo.la'}
            </Title>
          </TitleContainer>
        </CoursesHeaderContainer>
        <div className="container">
          <div>
            <HideOnMobile
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                width: '100%',
                padding: 30
              }}
            >
              <Filter
                universities={universities}
                onChangeUniversity={university => this.handleUniversityChange(university, true)}
                teachers={teachers}
                onChangeTeachers={teacher => this.handleTeacherChange(teacher, true)}
                onChangeCategory={this.onCategoryFilterSelect}
                onFilter={this.onFilter}
                isLoggedIn={user && user.id}
              />
            </HideOnMobile>
            <HideOnDesktop>
              <div>
                <Select
                  name="UNIVERSIDAD"
                  placeholder="Seleccione Universidad"
                  onChange={university => this.handleUniversityChange(university, true)}
                  onBlur={() => {}}
                  options={universities && universities.map(university => ({
                    label: university.name,
                    value: university.id
                  }))}
                />
              </div>
              <div
                onClick={() => this.toggleFilterModal()}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1178f2',
                  textAlign: 'center'
                }}
              >
                <p>FILTROS</p>
                <img src={filterIcon} alt="filter" />
              </div>
            </HideOnDesktop>
            <div>
              {userCourses.length && !query && token ? (
                <div className="user-courses-general">
                  <div style={{
                    padding: '0px 50px',
                    fontSize: '18px',
                    fontWeight: 600
                  }}>
                    <span>Continuar viendo</span>
                    {userCourses.length > 3 && (
                      <span
                        role="presentation"
                        onClick={() => pushRoute(`/${service.getCountry().countryCode}/perfil`)}
                        className="courses-user-link"
                      >
                        {'Ver todos'}
                      </span>
                    )}
                  </div>
                  <div style={{
                    padding: 30,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column' }}>
                    <CourseGrid
                      courseList={userCourses.slice(0, 3)}
                      history={history}
                      lowestPrice={getLowestPriceFromPlans(plans)}
                    />
                  </div>
                </div>
              ) : null}
              <div>
                {user && !query && (
                  <section style={{
                    padding: '0px 50px',
                    fontSize: '18px',
                    fontWeight: 600
                  }}>
                    <span>Todos los cursos</span>
                  </section>
                )}
                {query && (
                  <div style={{
                    padding: '0px 50px',
                    fontSize: '18px',
                    fontWeight: 600
                  }}>
                    <span>{`Resultados de la búsqueda "${query}"`}</span>
                  </div>
                )}
                {loadingCourses ? (
                  <LoadingCourses />
                ) : (
                  <div style={{ padding: 15 }}>
                    {courses.length > 0 ? (
                      <InfiniteScroll
                      dataLength={courses.length}
                      next={() => this.loadCourses({}, true)}
                      hasMore={hasNext}
                      scrollThreshold={0.5}
                    >
                      <CourseGrid
                        courseList={courses}
                        history={history}
                        lowestPrice={getLowestPriceFromPlans(plans)}
                        isAccountFreezed={user && user.access_type === 'freezed'}
                      />
                    </InfiniteScroll>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center'}}>
                        No encontramos resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <FiltersModal {...filterModalProps} />
          </div>
        </div>
        <UpdateInfoModal
          show={showUpdateInfoModal}
          universities={universities}
          onSubmit={this.handleUpdateInfoModalSubmit}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, register, courses }) => ({
  token: auth.token,
  user: auth.user,
  userCreated: register.userCreated,
  userSignIn: auth.userSignIn,
  userEnrollments: courses.userEnrollments
});

const mapDispatchToProps = {
  clearUserCreated,
  cleanUserSignIn,
  getUserAccess: () => getUserCourses(),
  setDiscountCoupon: coupon => setCouponCode(coupon),
  isValidCouponCode: (couponCode, token) => validateCouponCode(couponCode, token),
  setRoute: route => updateRoute(route),
  setCoursesProgress: courses => setCourses(courses),
  setUpdatedUser: user => setUser(user)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Courses));
