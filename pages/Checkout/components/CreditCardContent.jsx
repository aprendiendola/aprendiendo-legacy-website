import React, { Component } from 'react';
import ReactGA from 'react-ga';
import valid from 'card-validator';
import facebookPixel from 'utils/facebook';
import service from 'services';
import Button from 'components/Button';
import { Router } from 'routes';
import Input from '../../PremiumCheckout/components/Input';
import '../styles.scss';
import { CheckoutContainer } from './styles';
import PaymentLoading from './PaymentLoading';
import PAYMENT_METHODS from './consts';
import checkIcon from 'assets/images/icons/check.png';


// TODO: Refactor this component to use formik

const PAID_STATUS = 'paid';
const { pushRoute } = Router;

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
    packageInfo: { price: 80 },
    isSubmiting: false,
    payer: { email: { value: '', touched: false }, name: { value: '', touched: false } },
  }

  componentWillMount = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  getValidationConfig = () => {
    return {
      creditCard: {
        sizeLimit: 4,
        inputs: this.cardNumber,
        nextInput: this.expirationDate[1],
      },
      expirationDate: {
        sizeLimit: 2,
        inputs: this.expirationDate,
        nextInput: this.securityCode,
      },
    };
  }

  isValidForm = () => {
    const {
      cardValidation,
      expirationValidation,
      cvvValidation,
      payer,
    } = this.state;

    return (cardValidation && expirationValidation && cvvValidation
    && cardValidation.isValid
    && expirationValidation.isValid
    && cvvValidation.isValid
    && this.isValidEmail(payer.email.value) && (payer.name.value !== ''));
  }

  submitForm = async () => {
    const {
      cardValidation,
      cvv,
      cardNumberArray,
      expirationDateArray,
      packageInfo,
      payer,
    } = this.state;

    const {
      params, pay, token, isPaid, history, totalPrice, orderDetails, updateCart, coupon, couponSource, couponMedium,
    } = this.props;
    const orderDetailsArr = Array.isArray(orderDetails) ? orderDetails : [orderDetails];
    if (this.isValidForm()) {
      this.setState({ isSubmiting: true });

      const trackingData = {
        source: couponSource,
        medium: couponMedium
      };

      const body = {
        country: service.getCountry().countryCode.toUpperCase(),
        amount: totalPrice,
        type: PAYMENT_METHODS.PAYU,
        discount: 0,
        order_details: orderDetailsArr,
        trackingData,
        payment_info: {
          card_number: cardNumberArray.join(''),
          card_expiration_date: `20${expirationDateArray[1]}/${expirationDateArray[0]}`,
          security_code: cvv,
          payment_method: cardValidation.card.type.toUpperCase(),
          payer_name: payer.name.value,
          payer_email: payer.email.value,
        },
      };

      /** Send coupon id if exists */
      if (coupon) {
        body.couponId = coupon.id;
        body.trackingData.coupon = coupon.code;
      }

      facebookPixel.addPaymentInfo({
        content_category: PAYMENT_METHODS.PAYU,
        content_ids: orderDetailsArr.map(({ id }) => id),
        num_items: orderDetails.length,
        value: totalPrice,
        currency: service.getCountry().currency,
      });

      await this.initCheckoutProcess(token, body, orderDetailsArr, orderDetails, totalPrice, history);
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
  }

  validateCardInput = number => {
    this.setState({
      cvvValidation: valid.cvv(number),
      cvv: number,
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
  }

  checkValidStatus = (cardProp, validType) => {
    const validationObj = this.state[cardProp];

    if (validationObj) {
      return validType
        ? !validationObj.isValid && !validationObj.isPotentiallyValid
        : validationObj.isValid;
    }
  }

  validatedInputPayer = (field, message, validation) => {
    if (validation) {
      return (
        <div className="checkout-input-check">
          <img alt="icon" src={checkIcon} />
        </div>
      );
    } if (field.touched) {
      return (
        <div className="error-message">
          {message}
        </div>
      );
    }
  }

  async initCheckoutProcess(token, body, orderDetailsArr, orderDetails, totalPrice, history) {
    const response = await service.processCheckout(token, body);
    if (!response.error && response[0].state === PAID_STATUS) {
      mixpanel.track('Payment confirmation', { orderId: response[0].id });
      facebookPixel.orderCompleted({
        content_category: PAYMENT_METHODS.PAYU,
        order_id: response[0].id,
        content_ids: orderDetailsArr.map(({ id }) => id),
        contents: orderDetailsArr.map(({ package: packageName }) => packageName || 'Clase individual'),
        content_type: orderDetailsArr.map(({ name }) => name),
        num_items: orderDetails.length,
        value: totalPrice,
        currency: service.getCountry().currency,
      });
      ReactGA.plugin.require('ecommerce');
      ReactGA.plugin.execute('ecommerce', 'addTransaction', {
        id: response[0].metadata.transactionResponse.orderId,
        affiliation: 'Cursos',
        revenue: response[0].amount,
        shipping: '0',
        tax: '0'
      });
      response[0].order_details.map(detail => {
        ReactGA.plugin.execute('ecommerce', 'addItem', {
          id: detail.id,
          name: detail.name,
          price: detail.price,
          quantity: '1'
        });
      });
      ReactGA.plugin.execute('ecommerce', 'send');
      pushRoute(`/${service.getCountry().countryCode}/cambiate-a-premium`);
    } else {
      this.showErrorOnForm();
    }
  }

  showErrorOnForm() {
    const { toggleModal } = this.props;

    this.setState({ isSubmiting: false });
    toggleModal();
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
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '15px' }}>
                <p>
                  <small className="small-text">
                  Al confirmar tu compra aceptas los
                    {' '}
                    <a href="https://aprendiendo.la/pe/condiciones-de-uso">
                      {'Términos y condiciones'}
                    </a>
                  </small>
                </p>
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


export default CheckoutContent;
