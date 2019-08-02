import React, { Component, Fragment } from "react";
import Accordion from "components/Accordion";
import facebookPixel from "utils/facebook";
import ReactGA from "react-ga";
import { getUrlParams, withoutAccent } from "utils/common";
import service from "services";
import CheckoutErrorModal from "components/CheckoutErrorModal";
import { Elements, StripeProvider } from "react-stripe-elements";
import YapeModal from "components/YapeModal";
import whatsappIcon from "assets/images/icons/whatsapp@2x.png";
import { withRouter } from "next/router";
import { Router } from "routes";
import ProductCard from "./ProductCard";
import "../styles.scss";
import Heading from "./PaymentHeading";
import YapeContent from "./YapeContent";
import PAYMENT_METHODS from "./consts";
import { ERROR_MESSAGES, CONTACT_NUMBER, PACKAGE_PRICE } from "constants";
import PackageCheckoutForm from "./PackageCheckoutForm";

const { pushRoute } = Router;

class Payment extends Component {
  state = {
    isCashLoading: false,
    currentMethod: "PAYU",
    modalActive: false
  };

  componentDidMount() {
    const { orderDetails, totalPrice } = this.props;

    if (!Array.isArray(orderDetails)) {
      mixpanel.track("InitiateCheckout", {
        content_type: [orderDetails.name],
        content_category: orderDetails.university,
        content_ids: [orderDetails.id],
        contents: [orderDetails.package || "Clase individual"],
        num_items: 1,
        value: totalPrice,
        currency: service.getCountry().currency
      });
      facebookPixel.checkoutStarted({
        content_type: [orderDetails.name],
        content_category: orderDetails.university,
        content_ids: [orderDetails.id],
        contents: [orderDetails.package || "Clase individual"],
        num_items: 1,
        value: totalPrice,
        currency: service.getCountry().currency
      });
    } else {
      facebookPixel.checkoutStarted({
        content_type: orderDetails.map(({ name }) => name),
        content_category: orderDetails.map(({ university }) => university),
        content_ids: orderDetails.map(({ id }) => id),
        contents: orderDetails.map(
          ({ package: packageName }) => packageName || "Clase individual"
        ),
        num_items: orderDetails.length,
        value: totalPrice,
        currency: service.getCountry().currency
      });
      mixpanel.track("InitiateCheckout", {
        content_type: orderDetails.map(({ name }) => name),
        content_category: orderDetails.map(({ university }) => university),
        content_ids: orderDetails.map(({ id }) => id),
        contents: orderDetails.map(
          ({ package: packageName }) => packageName || "Clase individual"
        ),
        num_items: orderDetails.length,
        value: totalPrice,
        currency: service.getCountry().currency
      });
    }
  }

  setCurrentMethod(currentMethod) {
    this.setState({ currentMethod });
  }

  getProductCard = products => {
    return (
      <ProductCard
        name={products[0].course.data.name}
        university={products[0].course.data.university.data.name}
        showPrice={false}
        packageName={products[0].title}
      />
    );
  };

  toggleModal = () => {
    const { modalActive } = this.state;
    this.setState({ modalActive: !modalActive });
  };

  toggleYapeModal = () => {
    const { yapeModalActive } = this.state;
    this.setState({ yapeModalActive: !yapeModalActive });
  };

  async processCashPayment(dni) {
    this.setState({ isCashLoading: true });

    const { token, totalPrice, orderDetails, history, updateCart } = this.props;
    const orderDetailsArr = Array.isArray(orderDetails)
      ? orderDetails
      : [orderDetails];

    const body = {
      country: service.getCountry().countryCode.toUpperCase(),
      amount: totalPrice,
      discount: 0,
      type: PAYMENT_METHODS.PAYU,
      order_details: orderDetailsArr,
      payment_info: {
        payment_method: PAYMENT_METHODS.CASH,
        payer_dni: dni
      }
    };
    try {
      const response = await service.processCheckout(token, body);

      if (response[0].state !== "denied") {
        history.push("/cash");
      } else {
        this.toggleModal();
      }
    } catch (err) {
      this.toggleModal();
    }
    await updateCart(token);
    this.setState({ isCashLoading: false });
  }

  afterSubmit = async response => {
    const { orderDetails, token } = this.props;

    if (response[0]) {
      const { data } = response;
      const { user, updateUser, router, token } = this.props;

      const migrate = getUrlParams(router.asPath).migrate !== undefined;

      if (migrate) {
        facebookPixel.migrate();
      } else {
        mixpanel.track("Payment confirmation", {
          packageId: orderDetails[0].id
        });
        facebookPixel.orderCompleted({
          content_category: PAYMENT_METHODS.STRIPE,
          suscription_id: orderDetails[0].id,
          content_ids: [0],
          contents: withoutAccent(orderDetails[0].name),
          content_type: withoutAccent(orderDetails[0].name),
          num_items: 1,
          value: orderDetails[0].amount,
          sold_value: PACKAGE_PRICE,
          currency: service.getCountry().currency
        });
        ReactGA.plugin.require("ecommerce");
        ReactGA.plugin.execute("ecommerce", "addItem", {
          id: orderDetails[0].id,
          name: withoutAccent(orderDetails[0].name),
          sku: orderDetails[0].id, // seems to be required
          price: orderDetails[0].amount,
          sold_price: PACKAGE_PRICE,
          category: "Package",
          quantity: "1"
        });
        ReactGA.plugin.execute("ecommerce", "addTransaction", {
          id: orderDetails[0].id,
          affiliation: withoutAccent(orderDetails[0].name),
          value: orderDetails[0].amount,
          sold_price: PACKAGE_PRICE,
          shipping: "0",
          tax: "0"
        });
        ReactGA.plugin.execute("ecommerce", "send");
      }

      await updateUser(token);

      pushRoute(
        `/${service.getCountry().countryCode}/exito/${withoutAccent(
          orderDetails[0].name
        ).toLowerCase()}`
      );
    } else {
      let errorMessage = ERROR_MESSAGES.default_payment_error;

      if (response.status === 409) {
        errorMessage = ERROR_MESSAGES.user_already_subscribed;
      }

      if (response.data) {
        errorMessage = ERROR_MESSAGES[response.data.message]
          ? ERROR_MESSAGES[response.data.message]
          : errorMessage;
      }

      this.showErrorOnForm(errorMessage);
    }
  };

  showErrorOnForm(errorText = false) {
    this.toggleModal(errorText);
  }

  render() {
    const {
      user,
      token,

      totalPrice,

      orderDetails
    } = this.props;

    const { currentMethod, modalActive, yapeModalActive } = this.state;

    const modalProps = {
      active: modalActive,
      closeModal: this.toggleModal
    };

    const yapeModalProps = {
      active: yapeModalActive,
      closeModal: this.toggleYapeModal,
      totalPrice
    };

    return (
      <div>
        <div className="payment-header">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="total-price-span">{"Total a pagar:"}</span>
            <div>
              <span className="total-price">
                {service.getCountry().currencySymbol}
                {totalPrice}
              </span>
              <span
                className="total-price-before"
                style={{ visibility: "hidden" }}
              >
                {service.getCountry().currencySymbol}
                {totalPrice}
              </span>
            </div>
          </div>
        </div>
        {this.getProductCard(orderDetails)}
        <div className="checkout-option">
          <Accordion
            heading={
              <Heading
                name="PAYU"
                setCurrentMethod={method => this.setCurrentMethod(method)}
              />
            }
            disableClickListener
            content={
              <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
                <div style={{ padding: "16px 5px" }}>
                  <Elements>
                    <PackageCheckoutForm
                      onSubmit={this.onSubmit}
                      orderDetails={orderDetails}
                      user={user}
                      countryCode={service.getCountry().countryCode}
                      afterSubmit={this.afterSubmit}
                      token={token}
                      totalPrice={totalPrice}
                    />
                  </Elements>
                </div>
              </StripeProvider>
            }
            type="checkbox"
            isExpanded={currentMethod === PAYMENT_METHODS.PAYU}
          />

          {service.getCountry().countryCode.toUpperCase() === "PE" ? (
            <Fragment>
              <Accordion
                heading={
                  <Heading
                    name={PAYMENT_METHODS.YAPE}
                    setCurrentMethod={method => this.setCurrentMethod(method)}
                  />
                }
                content={
                  <YapeContent toggleModal={() => this.toggleYapeModal()} />
                }
                disableClickListener
                type="checkbox"
                isExpanded={currentMethod === PAYMENT_METHODS.YAPE}
              />
            </Fragment>
          ) : (
            <div />
          )}
        </div>

        <CheckoutErrorModal {...modalProps} />
        <YapeModal {...yapeModalProps} />

        <div className="checkout-payment-footer">
          <div className="checkout-payment-help checkout-footer-section">
            <p>{"¿Necesitas ayuda? Escríbenos"}</p>
            <p className="whatsapp-number">
              <img src={whatsappIcon} alt="whatsapp" />{" "}
              <a href={`https://wa.me/51${CONTACT_NUMBER}`} target="blank">
                {CONTACT_NUMBER}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Payment);
