import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Router } from 'routes';
import service from 'services';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { clearCart } from 'reducers/shoppingCart';
import { clearUserCourses, setUserEnrollments } from 'reducers/courses';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import eventEmmiter from 'services/emitter';
import FreezedModal from 'components/molecules/FreezedModal';
import SuspendedModal from 'components/molecules/SuspendedModal';
import ChangePlanModal from 'components/molecules/ChangePlanModal';
import CouponBanner from '../CouponBanner';
import Barriers from './Barriers';
import {
  authToInitialState,
  setUser,
  setUnFreezeModal,
  setSuspendedModal,
  setChangePlanModal
} from 'reducers/auth';

ReactGA.initialize(`${process.env.GOOGLE_ANALYTICS}`);
if (typeof window !== 'undefined') {
  ReactGA.ga('require', process.env.GOOGLE_OPTIMIZE);
}

const Container = styled.div`
  max-height: initial;
  margin-bottom: ${({ isPlayer }) => (isPlayer ? '0px' : '140px')};
`;

class Layout extends Component {
  state = {
    freezeModalActive: true,
    loadingFreeze: false,
    errorOnFreeze: false,
    showPlans: false,
    plans: []
  };

  distractorFreeViews = ['checkout', 'cambiate-a-premium', 'preventa'];

  footerLessViews = ['registro', 'login'];

  componentDidMount() {
    const { setUnFreezeModal, setSuspendedModal } = this.props;
    setUnFreezeModal(true);
    setSuspendedModal(true);
  }

  isIncludeIn = (path, target) => this[target].map(url => path.includes(url)).includes(true);

  toggleModalFreeze = () => {
    const { freezeModalActive, setUnFreezeModal } = this.props;
    setUnFreezeModal(!freezeModalActive);
  };

  toggleModalSuspended = () => {
    const { suspendedModalActive, setSuspendedModal } = this.props;
    setSuspendedModal(!suspendedModalActive);
  };

  toggleModalChangePlan = () => {
    const { setChangePlanModal } = this.props;
    setChangePlanModal({});
    Router.pushRoute(`/${service.getCountry().countryCode}/cursos`);
  };

  unfreeze = async () => {
    const {
      token, user, setUserToState, setUserEnrollmentsToState
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
      setUserToState(Object.assign({}, user, { access_type: 'subscribed' }));
      location.reload();
    }

    this.setState({
      loadingFreeze: false
    });
  };

  goToPricing = () => {
    const { suspendedModalActive, setSuspendedModal } = this.props;
    setSuspendedModal(!suspendedModalActive);

    Router.pushRoute(`/${service.getCountry().countryCode}/suscripcion#pricing`);
  };

  renderBanner(isPlayer) {
    const {
      router: { asPath },
      user
    } = this.props;

    if (!isPlayer && !this.isIncludeIn(asPath, 'distractorFreeViews')) {
      if (user && user.access_type === 'subscribed') {
        return null;
      }
      return <CouponBanner />;
    }
  }

  renderBarrierModal() {
    const { showPlans, plans } = this.state;
    const { activeBarrier } = this.props;

    const hideModal = activeBarrier && activeBarrier.barrier_up;

    if (hideModal || hideModal === undefined) {
      return <div />;
    }

    let title = '';
    let subtitle = '';

    switch (activeBarrier.barrier_type) {
      case 'videos-a-day':
        title = 'Ya consumiste todas tus clases diarias';
        subtitle = (
          <span style={{ fontSize: '16px' }}>
            Tu plan solo te permite acceder a <strong>{activeBarrier.max_videos_allowed}</strong> clases al
            día
          </span>
        );
        break;
      case 'consumption':
        title = 'Excediste tu límite de acceso diario';
        subtitle = (
          <span style={{ fontSize: '16px' }}>
            Tu plan solo te permite ver <strong>{activeBarrier.max_time_consumption}</strong> minutos de
            clases diarios
          </span>
        );
        break;
      case 'devices':
        break;
      default: // unknown barrier type
    }

    // load plans from bd if necessary

    return (
      <ChangePlanModal
        toggleActive={this.toggleModalChangePlan}
        modalActive
        onOk={this.goToPricing}
        title={title}
        subTitle={subtitle}
        showPlans={showPlans}
        plans={plans}
      />
    );
  }

  render() {
    const {
      children,
      router: { asPath },
      clearCartItems,
      clearAuth,
      clearUserCourses,
      user,
      freezeModalActive,
      suspendedModalActive,
      token
    } = this.props;

    const {
      loadingFreeze, errorOnFreeze, showPlans, plans
    } = this.state;

    ReactGA.set({ page: asPath });
    ReactGA.pageview(asPath);
    eventEmmiter.addListener('onTokenExpired', () => {
      localStorage.clear();
      clearCartItems();
      clearAuth();
      clearUserCourses();
      Router.pushRoute(`/${service.getCountry().countryCode}/cursos`);
      location.reload();
    });

    const isPlayer = asPath.includes('player');

    const isSubscription =
      asPath.split('/').includes('suscripcion') ||
      asPath.split('/')[asPath.split('/').length - 1].includes('suscripcion');

    return (
      <div style={asPath.split('/').includes('player') ? { background: '#282828' } : {}}>
        <Header
          path={asPath}
          isDark={asPath.split('/').includes('player')}
          isCheckout={this.isIncludeIn(asPath, 'distractorFreeViews')}
          isSubscription={isSubscription}
        />
        {/* <Barriers user={user} token={token} /> */}
        <Container isPlayer={isPlayer || this.isIncludeIn(asPath, 'footerLessViews')}>{children}</Container>
        {user && user.access_type === 'freezed' && (
          <FreezedModal
            modalActive={freezeModalActive}
            loading={loadingFreeze}
            errorOnFreeze={errorOnFreeze}
            unfreeze={() => this.unfreeze()}
            subscription={user.subscription}
            toggleModal={() => this.toggleModalFreeze()}
          />
        )}
        {user && user.access_type === 'suspended' && (
          <SuspendedModal
            modalActive={suspendedModalActive}
            onOk={this.goToPricing}
            toggleModal={() => this.toggleModalSuspended()}
          />
        )}
        {this.renderBarrierModal()}
        <Footer
          isVisible={
            this.isIncludeIn(asPath, 'distractorFreeViews') ||
            isPlayer ||
            this.isIncludeIn(asPath, 'footerLessViews')
          }
          isPlayer={isPlayer}
        />

        {this.renderBanner(isPlayer)}
      </div>
    );
  }
}

const propTypes = {
  children: PropTypes.node
};

Layout.propTypes = propTypes;

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
    user: auth.user,
    freezeModalActive: auth.freezeModalActive,
    suspendedModalActive: auth.suspendedModalActive,
    activeBarrier: auth.activeBarrier
  };
};

const mapDispatchToProps = {
  setUserToState: user => setUser(user),
  setUserEnrollmentsToState: data => setUserEnrollments(data),
  clearCartItems: () => clearCart(),
  clearUserCourses: () => clearUserCourses(),
  clearAuth: () => authToInitialState(),
  setUnFreezeModal: bool => setUnFreezeModal(bool),
  setSuspendedModal: bool => setSuspendedModal(bool),
  setChangePlanModal: bool => setChangePlanModal(bool)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Layout));
