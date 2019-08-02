import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { splitUrl } from 'utils/common';
import { Router } from 'routes';
import service from 'services';
import loadingSvg from 'static/images/loading.svg';
import './styles.scss';
import Payment from './components/Payment';
import { pay, checkoutInitialState } from '../../reducers/checkout';
import { updateFullUser as updateUser } from 'reducers/auth';
import { updateRoute } from 'reducers/history';
import CashPaymentAdvise from './components/CashPaymentAdvise';

const Heading = () => (
  <div className="checkout-heading">
    <h1 className="checkout-title">Estás a un paso de ser premium</h1>
  </div>
);

const { pushRoute } = Router;

class Checkout extends PureComponent {
  state = {
    plan: null,
    loading: true
  };

  componentDidMount() {
    const { token, router, setRoute } = this.props;

    if (!token) {
      setRoute(router.asPath);
      pushRoute(`/${service.getCountry().countryCode}/login`);
    }

    const urlParams = splitUrl(router.asPath);
    const planId = urlParams[urlParams.length - 1];

    this.loadPlan(planId);
  }

  loadPlan = async planId => {
    try {
      const response = await service.getPlan(planId);

      if (response.status === 404) {
        pushRoute(`/${service.getCountry().countryCode}/404`);
      }

      this.setState({ plan: response, loading: false });
    } catch (err) {
      return err;
    }
  };

  render() {
    const {
      history, user, token, isPaid, pay, updateUser
    } = this.props;
    const { plan, loading } = this.state;

    return loading ? (
      <div style={{ textAlign: 'center', padding: '100px 0px' }}>
        <img src={loadingSvg} alt="loading" />
      </div>
    ) : (
      <div className="wrapper-checkout">
        <Heading />
        <div className="checkout-content">
          <Payment
            history={history}
            plan={plan}
            user={user}
            token={token}
            updateUser={updateUser}
            isPaid={isPaid}
            pay={pay}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <CashPaymentAdvise />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, checkout }) => ({
  token: auth.token,
  user: auth.user,
  isPaid: checkout.isPaid,
  finalPrice: checkout.finalPrice,
  finalItems: checkout.finalItems
});

const mapDispatchToProps = {
  pay,
  checkoutInitialState,
  updateUser: (token, user) => updateUser(token, user),
  setRoute: route => updateRoute(route)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Checkout));
