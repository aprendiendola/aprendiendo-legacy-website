import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import service from 'services';
import { withRouter } from 'next/router';
import { Router } from 'routes';
import facebookPixel from 'utils/facebook';
import { getUserCourses } from '../../reducers/courses';
import { updateRoute } from 'reducers/history';
import {
  MyCourses,
  Subscription,
  Configuration,
  Referrals,
  HorizontalMenu,
  VerticalMenu
} from './components';
import { Container, ContentSection, ContainerWrapper } from './styles';
import { getUrlParams } from 'utils/common';

import './styles.scss';

const { pushRoute } = Router;

class Profile extends Component {
  state = {
    courses: [],
    selectedSection: 'cursos',
  };

  componentDidMount() {
    const { userEnrollments, getUserAccess, router, user, setRoute } = this.props;

    if (!user) {
      setRoute(router.asPath);
      Router.pushRoute(`/${service.getCountry().countryCode}/login`);
    }

    if (getUrlParams(router.asPath).subscription) {
      this.setSelectedSection('subscription');
    }

    if (getUrlParams(router.asPath).configuration) {
      this.setSelectedSection('configuration');
    }

    if (getUrlParams(router.asPath).referrals) {
      this.setSelectedSection('referrals');
    }

    getUserAccess();

    if (Array.isArray(userEnrollments)) {
      this.setState({
        courses: userEnrollments.map(e => e.course.data).reverse()
      });
    }

    mixpanel.track('Profile');
    facebookPixel.viewContent({
      content_name: 'Profile'
    });
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.userEnrollments.length > 0) {
      return {
        courses: nextProps.userEnrollments.map(e => e.course.data).reverse()
      };
    }
  }

  setSelectedSection = section => {
    this.setState({
      selectedSection: section
    });
  };

  render() {
    const { courses, selectedSection } = this.state;
    const {
      user, history, token
    } = this.props;

    return user ? (
      <Container>
        <ContainerWrapper>
          <HorizontalMenu setSelectedSection={this.setSelectedSection} activeTab={selectedSection} />
          <VerticalMenu user={user} setSelectedSection={this.setSelectedSection} activeTab={selectedSection} />
          <ContentSection>
            {selectedSection === 'cursos' && <MyCourses courses={courses} history={history} />}
            {selectedSection === 'subscription' && <Subscription token={token} user={user} setSelectedSection={this.setSelectedSection} />}
            {selectedSection === 'configuration' && <Configuration token={token} user={user} setSelectedSection={this.setSelectedSection} />}
            {selectedSection === 'referrals' && <Referrals token={token} user={user} setSelectedSection={this.setSelectedSection} />}
          </ContentSection>
        </ContainerWrapper>
      </Container>
    ) : null;
  }
}

const mapStateToProps = ({ courses, auth }) => ({
  token: auth.token,
  user: auth.user,
  userEnrollments: courses.userEnrollments
});

const mapDispatchToProps = {
  getUserAccess: () => getUserCourses(),
  setRoute: route => updateRoute(route)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Profile));
