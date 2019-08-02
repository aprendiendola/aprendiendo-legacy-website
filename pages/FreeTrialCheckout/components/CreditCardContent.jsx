import React, { Component } from 'react';
import ReactGA from 'react-ga';
import valid from 'card-validator';
import facebookPixel from 'utils/facebook';
import service from 'services';
import { withRouter } from 'next/router';
import Button from 'components/Button';
import Input from './Input';
import '../styles.scss';
import { CheckoutContainer } from './styles';
import PaymentLoading from './PaymentLoading';
import { getUrlParams, avoidUrlParams } from 'utils/common';
import PAYMENT_METHODS from './consts';
import checkIcon from 'assets/images/icons/check.png';
import { Router } from 'routes';

// TODO: Refactor this component to use formik

const { pushRoute } = Router;
const PAID_STATUS = 'paid';
const PENDING_STATUS = 'pending';

const PLAN_PREMIUM = 'Plan Premium';

class CheckoutContent extends Component {
  cardNumber = [];

  expirationDate = [];

  state = {
    cardNumberArray: [],
    expirationDateArray: [],
    cvv: null,
    cardValidation: null,
    expirationValidation: null,
    cvvValidation: null,
    modalActive: false,
    isSubmiting: false,
    payer: { email: { value: '', touched: false }, name: { value: '', touched: false } }
  };


  componentWillMount = () => {
    window.scrollTo(0, 0);
  };


  getValidationConfig = () => {
    return {
      creditCard: {
        sizeLimit: 4,
        inputs: this.cardNumber,
        nextInput: this.expirationDate[1]
      },
      expirationDate: {
        sizeLimit: 2,
        inputs: this.expirationDate,
        nextInput: this.securityCode
      }
    };
  };

  isValidForm = () => {
    const {
      cardValidation, expirationValidation, cvvValidation, payer
    } = this.state;

    return (
      cardValidation &&
      expirationValidation &&
      cvvValidation &&
      cardValidation.isValid &&
      expirationValidation.isValid &&
      cvvValidation.isValid &&
      this.isValidEmail(payer.email.value) &&
      payer.name.value !== ''
    );
  };

  submitForm = async () => {
    const {
      cardValidation, cvv, cardNumberArray, expirationDateArray, payer
    } = this.state;

    const {
      token,
      user,
      router,
      totalPrice,
      updateUser,
      coupon,
      couponSource,
      couponMedium
    } = this.props;

    if (this.isValidForm()) {
      this.setState({ isSubmiting: true });

      const trackingData = {
        source: couponSource,
        medium: couponMedium
      };

      const migrate = getUrlParams(router.asPath).migrate !== undefined;

      const body = {
        country: service.getCountry().countryCode.toUpperCase(),
        type: PAYMENT_METHODS.PAYU,
        plan_id: avoidUrlParams(router.asPath)[0],
        trackingData,
        migrate,
        payment_info: {
          card_number: cardNumberArray.join(''),
          card_expiration_date: `20${expirationDateArray[1]}/${expirationDateArray[0]}`,
          security_code: cvv,
          payment_method: cardValidation.card.type.toUpperCase(),
          payer_name: payer.name.value,
          payer_email: payer.email.value
        }
      };

      /** Send coupon id if exists */
      if (coupon) {
        body.couponId = coupon.id;
        body.trackingData.coupon = coupon.code;
      }

      facebookPixel.addPaymentInfo({
        content_category: PAYMENT_METHODS.PAYU,
        content_ids: [0],
        num_items: 1,
        value: totalPrice,
        currency: service.getCountry().currency
      });

      const response = await service.processCheckout(token, body, true);

      if (response.error) {
        let errorMessage = false;
        if (Array.isArray(response.response.data) && migrate) {
          errorMessage = response.response.data[0].message;
        }
        this.showErrorOnForm(errorMessage);
        return;
      }

      if ((response[0].state === PAID_STATUS || response[0].state === PENDING_STATUS) && !migrate) {
        mixpanel.track('Payment confirmation', { orderId: response[0].id });
        facebookPixel.orderCompleted({
          content_category: PAYMENT_METHODS.PAYU,
          order_id: response[0].id,
          content_ids: [0],
          contents: PLAN_PREMIUM,
          content_type: PLAN_PREMIUM,
          num_items: 1,
          value: totalPrice,
          currency: service.getCountry().currency,
        });
        ReactGA.plugin.require('ecommerce');
        ReactGA.plugin.execute('ecommerce', 'addTransaction', {
          id: response[0].id,
          affiliation: PLAN_PREMIUM,
          revenue: response[0].amount,
          shipping: '0',
          tax: '0'
        });
        ReactGA.plugin.execute('ecommerce', 'send');

        user.access_type = 'subscribed';

        updateUser(token, user);

        pushRoute(`/${service.getCountry().countryCode}/exito`);
      } else if (migrate) {
        facebookPixel.migrate();

        user.access_type = 'subscribed';

        updateUser(token, user);

        pushRoute(`/${service.getCountry().countryCode}/exito`);
      } else {
        this.showErrorOnForm();
      }
    }
  };

  validateCardInputGroup = (number, inputOrder, inputGroup) => {
    const inputDataArray = inputGroup === 'creditCard' ? 'cardNumberArray' : 'expirationDateArray';
    const varData = inputGroup === 'creditCard' ? 'cardValidation' : 'expirationValidation';
    const array = this.state[inputDataArray].slice();
    let data = null;

    array[inputOrder - 1] = number;

    if (inputGroup === 'creditCard') {
      data = valid.number(array.join(''));
    } else {
      data = valid.expirationDate(array.join(''));
    }

    const obj = {};

    obj[inputDataArray] = array;
    obj[varData] = data;

    this.setState(obj);

    this.goNextInput(number, inputOrder, inputGroup);
  };

  goNextInput = (number, inputOrder, inputGroup) => {
    const currentValidation = this.getValidationConfig()[inputGroup];

    if (number.length === currentValidation.sizeLimit) {
      if (inputOrder < currentValidation.sizeLimit) {
        currentValidation.inputs[inputOrder + 1].value = '';
        currentValidation.inputs[inputOrder + 1].focus();
      } else {
        currentValidation.nextInput.focus();
      }
    }
  };

  validateCardInput = number => {
    this.setState({
      cvvValidation: valid.cvv(number),
      cvv: number
    });

    if (number.length === 3) {
      this.payerNameInput.focus();
    }
  };

  validateCardName = name => {
    const { payer } = this.state;
    payer.name.value = name;
    payer.name.touched = true;
    this.setState({ payer });
  };

  validateCardEmail = email => {
    const { payer } = this.state;
    payer.email.value = email;
    payer.email.touched = true;
    this.setState({ payer });
  };

  isValidEmail = email => {
    const regexp = /[^@]+@[^\.]+\..+/g;
    return email.match(regexp);
  };

  checkValidStatus = (cardProp, validType) => {
    const validationObj = this.state[cardProp];

    if (validationObj) {
      return validType ? !validationObj.isValid && !validationObj.isPotentiallyValid : validationObj.isValid;
    }
  };

  validatedInputPayer = (field, message, validation) => {
    if (validation) {
      return (
        <div className="checkout-input-check">
          <img alt="icon" src={checkIcon} />
        </div>
      );
    }
    if (field.touched) {
      return <div className="error-message">{message}</div>;
    }
  };

  showErrorOnForm(errorText = false) {
    const { toggleModal } = this.props;

    this.setState({ isSubmiting: false });
    toggleModal(errorText);
  }

  render() {
    const { isSubmiting, payer } = this.state;

    return (
      <CheckoutContainer>
        {isSubmiting ? <PaymentLoading /> : (
          <div className="checkout-option-content">
            <form className="checkout-creditcard-form" onSubmit={e => e.preventDefault()}>
              <p className="checkout-label">
                {'Ingresa el número de la tarjeta'}
              </p>
              <div className="checkout-inputgroup">
                <div className="checkout-input-wrapper">
                  <Input
                    placeholder="----"
                    maxlength={4}
                    onChange={this.validateCardInputGroup}
                    multipartInputOrder={1}
                    inputGroup="creditCard"
                    inputRef={input => { this.cardNumber[1] = input; }}
                  />
                </div>
                <div className="checkout-input-wrapper">
                  <Input
                    placeholder="----"
                    maxlength={4}
                    onChange={this.validateCardInputGroup}
                    multipartInputOrder={2}
                    inputGroup="creditCard"
                    inputRef={input => { this.cardNumber[2] = input; }}
                  />
                </div>
                <div className="checkout-input-wrapper">
                  <Input
                    placeholder="----"
                    maxlength={4}
                    onChange={this.validateCardInputGroup}
                    multipartInputOrder={3}
                    inputGroup="creditCard"
                    inputRef={input => { this.cardNumber[3] = input; }}
                  />
                </div>
                <div className="checkout-input-wrapper">
                  <Input
                    placeholder="----"
                    maxlength={4}
                    onChange={this.validateCardInputGroup}
                    multipartInputOrder={4}
                    inputGroup="creditCard"
                    inputRef={input => { this.cardNumber[4] = input; }}
                  />
                </div>
                {
                  this.checkValidStatus('cardValidation')
                  && (
                    <div className="checkout-input-check">
                      <img alt="icon" src={checkIcon} />
                    </div>
                  )
                }
                {
                  this.checkValidStatus('cardValidation', 1)
                  && (
                    <div className="error-message">
                      El número ingresado no es correcto
                    </div>
                  )
                }
              </div>
              <p className="checkout-label">
              Fecha de expiración
              </p>
              <div className="checkout-inputgroup">
                <div className="checkout-input-wrapper">
                  <Input
                    placeholder="MM"
                    maxlength={2}
                    multipartInputOrder={1}
                    inputGroup="expirationDate"
                    onChange={this.validateCardInputGroup}
                    inputRef={input => { this.expirationDate[1] = input; }}
                  />
                </div>
                <div className="checkout-input-wrapper">
                  <Input
                    placeholder="AA"
                    maxlength={2}
                    multipartInputOrder={2}
                    inputGroup="expirationDate"
                    onChange={this.validateCardInputGroup}
                    inputRef={input => { this.expirationDate[2] = input; }}
                  />
                </div>
                {
                  this.checkValidStatus('expirationValidation')
                  && (
                    <div className="checkout-input-check">
                      <img alt="icon" src={checkIcon} />
                    </div>
                  )
                }
                {
                  this.checkValidStatus('expirationValidation', 1)
                  && (
                  <div className="error-message">
                    {'La fecha ingresada no es correcta'}
                  </div>
                  )
                }
              </div>
              <p className="checkout-label">
                {'Código de seguridad (al reverso de tu tarjeta)'}
              </p>
              <div className="checkout-inputgroup">
                <div className="checkout-input-wrapper checkout-input-cid">
                  <Input
                    placeholder="3 digitos"
                    maxlength={3}
                    onChange={this.validateCardInput}
                    inputRef={input => { this.securityCode = input; }}
                  />
                </div>
                {
                  this.checkValidStatus('cvvValidation')
                  && (
                    <div className="checkout-input-check">
                      <img alt="icon" src={checkIcon} />
                    </div>
                  )
                }
                {
                  this.checkValidStatus('cvvValidation', 1)
                  && (
                    <div className="error-message">
                      {'El número ingresado no es correcto'}
                    </div>
                  )
                }
              </div>
              <p className="checkout-label">
                {'Nombre del titular de la tarjeta'}
              </p>
              <div className="checkout-inputgroup">
                <div className="checkout-input-wrapper checkout-input-cid">
                  <Input
                    maxlength={255}
                    onChange={this.validateCardName}
                    inputRef={input => { this.payerNameInput = input; }}
                  />
                </div>
                {
                  this.validatedInputPayer(payer.name, 'Debes ingresar un nombre de pagador', payer.name.value !== '')
                }
              </div>
              <p className="checkout-label">
                {'Ingresa tu correo'}
              </p>
              <div className="checkout-inputgroup">
                <div className="checkout-input-wrapper checkout-input-cid">
                  <Input
                    onChange={this.validateCardEmail}
                    inputRef={input => { this.payerEmailInput = input; }}
                  />
                </div>
                {
                 this.validatedInputPayer(payer.email, 'Debes ingresar un correo válido', this.isValidEmail(payer.email.value))
                }
              </div>
              <div />
              <div className="checkout-option-action">
                <Button styleClass={this.isValidForm() ? 'is-blue' : 'is-dark-grey'} disabled={!this.isValidForm()} onClick={() => this.submitForm()}>
                  PAGAR
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '15px' }}>
                <div>
                  <img src="/static/images/sll-encrypt-logo.svg" alt="SSL" width="104px" />
                </div>
              </div>
            </form>
          </div>
        )
        }
      </CheckoutContainer>
    );
  }
}

export default withRouter(CheckoutContent);
