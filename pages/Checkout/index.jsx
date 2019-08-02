import React, { PureComponent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Router } from "routes";
import service from "services";
import "./styles.scss";
import Payment from "./components/Payment";
import { pay, checkoutInitialState } from "reducers/checkout";
import { loadCart } from "reducers/shoppingCart";
import { updateRoute } from "reducers/history";
import { updateFullUser as updateUser } from "reducers/auth";
import { PackageSelector } from "components";

const Heading = () => (
  <div className="checkout-heading">
    <h1 className="checkout-title">Finalizar Compra</h1>
    <p>Selecciona tu método de pago</p>
  </div>
);

const { pushRoute } = Router;

class Checkout extends PureComponent {
  state = {
    selectedPackage: null,
    loading: true
  };

  componentDidMount() {
    const { token, router, setRoute } = this.props;

    setRoute(router.asPath);

    if (!token) {
      pushRoute(`/${service.getCountry().countryCode}/login`);
    }

    const packageId = /[^/]*$/.exec(router.asPath)[0];
    this.loadPackage(packageId);
  }

  loadPackage = async packageId => {
    const { data: selectedPackage } = await service.getPackage(packageId);
    this.setState({
      selectedPackage,
      loading: false
    });
  };

  getShoppingCartData = buyedItem => {
    const cartContent = buyedItem || [];

    const orderDetails = cartContent.map(item => {
      delete item.tax;
      delete item.rowId;
      return item;
    });

    return orderDetails;
  };

  render() {
    const {
      history,
      match,
      user,
      token,
      isPaid,
      pay,
      finalPrice,
      finalItems,
      updateCart,
      updateUser
    } = this.props;

    const { selectedPackage, loading } = this.state;

    let orderDetails = finalItems;

    if (Array.isArray(finalItems)) {
      orderDetails = this.getShoppingCartData(finalItems);
    }

    return (
      <div className="wrapper">
        <Heading />
        <div>
          <PackageSelector
            defaultUniversity={(user && user.university_id) || 1}
          />
        </div>
        <div className="checkout-content">
          {loading ? (
            <div>cargando...</div>
          ) : (
            <Payment
              history={history}
              user={user}
              token={token}
              isPaid={isPaid}
              pay={pay}
              orderDetails={[selectedPackage]}
              totalPrice={selectedPackage.amount / 100}
              updateUser={updateUser}
            />
          )}
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
  setRoute: route => updateRoute(route),
  updateCart: token => loadCart(token),
  updateUser: (token, user) => updateUser(token, user)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Checkout));
