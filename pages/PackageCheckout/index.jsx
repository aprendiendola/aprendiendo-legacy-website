import React, { PureComponent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { PACKAGE_PRICE } from "constants";
import { Router } from "routes";
import service from "services";
import "./styles.scss";
import Payment from "./components/Payment";
import { pay, checkoutInitialState } from "reducers/checkout";
import { loadCart } from "reducers/shoppingCart";
import { updateRoute } from "reducers/history";
import { updateFullUser as updateUser } from "reducers/auth";
import { PackageSelector } from "components";
import { Container, Wrapper } from "./styles";

const { pushRoute } = Router;

class Checkout extends PureComponent {
  state = {
    selectedPackage: null
  };

  componentDidMount() {
    const { token, router, setRoute } = this.props;

    setRoute(router.asPath);

    if (!token) {
      pushRoute(`/${service.getCountry().countryCode}/login`);
    }
  }

  getShoppingCartData = buyedItem => {
    const cartContent = buyedItem || [];

    const orderDetails = cartContent.map(item => {
      delete item.tax;
      delete item.rowId;
      return item;
    });

    return orderDetails;
  };

  handlePackageChange = selectedPackage => {
    this.setState({
      selectedPackage: selectedPackage
    });
  };

  render() {
    const { history, user, token, isPaid, pay, updateUser } = this.props;

    const { selectedPackage } = this.state;

    let priceToShow = PACKAGE_PRICE;

    if(selectedPackage) {
      priceToShow = selectedPackage.course_id == 7 ? 99 : PACKAGE_PRICE;
    }

    return (
      <Container>
        <Wrapper>
          <div style={{ maxWidth: 400, padding: "0px 15px" }}>
            <PackageSelector
              defaultUniversity={(user && user.university_id) || 1}
              onChange={this.handlePackageChange}
            />
          </div>
          <div style={{ maxWidth: 400, padding: "0px 15px" }}>
            {selectedPackage && (
              <Payment
                history={history}
                user={user}
                token={token}
                isPaid={isPaid}
                pay={pay}
                orderDetails={[selectedPackage]}
                totalPrice={priceToShow}
                updateUser={updateUser}
              />
            )}
          </div>
        </Wrapper>
      </Container>
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
