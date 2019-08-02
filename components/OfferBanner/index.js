import React, { Fragment, Component } from 'react';
import Router, { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BannerContainer } from './black-friday';
import service from 'services';
import moment from 'moment';
import { setUnFreezeModal } from 'reducers/auth';

const SUBSCRIBED = 'subscribed';
const ENROLLED = 'enrolled';
const SUSPENDED = 'suspended';
const FREEZED = 'freezed';

class Banner extends React.Component {
  state = {
    user: null,
    showBanner: false
  }

  componentDidMount() {
    const { user } = this.props;
    if (user !== null) {
      this.setState({
        user
      });
    }

    this.setState({
      showBanner: true
    });
  }

  hasPaidEnrollments = () => {
    const { userEnrollments } = this.props;

    let hasPaidEnrollments = false;

    hasPaidEnrollments = userEnrollments.some(({ course }) =>
      course.data.is_free === false
    );

    return hasPaidEnrollments;
  }

  render() {
    const {
      isCoursesPage,
      setUnFreezeModal
    } = this.props;

    const { user, showBanner } = this.state;


    if (user && showBanner) {
      return (
        <Fragment>
          {(
            (user.access_type === ENROLLED && moment().isBefore('2019-03-02'))
            || (user.access_type === SUBSCRIBED && moment().isBefore('2019-03-02'))
            || user.access_type === SUSPENDED
            || user.access_type === FREEZED
          ) && (
            <BannerContainer
              accessType={user ? user.access_type : 'none'}
              hasPaidEnrollments={this.hasPaidEnrollments()}
              onClick={() => {
                if (user && user.access_type === ENROLLED) {
                  Router.push(`/${service.getCountry().countryCode}/cambiate-a-premium`);
                  return;
                }
                if (user && user.access_type === SUBSCRIBED) {
                  Router.push(`/${service.getCountry().countryCode}/perfil?subscription=true`);
                }
                if (user && user.access_type === SUSPENDED) {
                  Router.push(`/${service.getCountry().countryCode}/suscripcion#pricing`);
                }
                if (user && user.access_type === FREEZED) {
                  setUnFreezeModal(true);
                }
              }}
              isCoursesPage={isCoursesPage}
            />
          ) }
        </Fragment>
      );
    }
    return <div />;
  }
}

const mapDispatchToProps = {
  setUnFreezeModal: bool => setUnFreezeModal(bool)
};

const mapStateToProps = ({ auth, courses }) => ({
  token: auth.token,
  user: auth.user,
  userEnrollments: courses.userEnrollments,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(withRouter(Banner));
