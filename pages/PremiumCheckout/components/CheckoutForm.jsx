import React, { Component } from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import Button from 'components/Button';
import services from 'services';
import { CheckoutContainer } from '../../Checkout/components/styles';
import { FormItem, ButtonContainer, InputWrapper, Label, SSLImage, ButtonWrapper } from './styles';

const baseInputStyle = textAlign => ({
  base: {
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#ccc'
    },
    textAlign: textAlign || 'left'
  }
});

const cardBrandToPfClass = {
  visa: 'pf-visa',
  mastercard: 'pf-mastercard',
  amex: 'pf-american-express',
  discover: 'pf-discover',
  diners: 'pf-diners',
  jcb: 'pf-jcb',
  unknown: 'pf-credit-card'
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  state = {
    loading: false
  };

  setBrandIcon = brand => {
    const brandIconElement = document.getElementById('brand-icon');
    let pfClass = 'pf-credit-card';
    if (brand in cardBrandToPfClass) {
      pfClass = cardBrandToPfClass[brand];
    }
    for (let i = brandIconElement.classList.length - 1; i >= 0; i--) {
      brandIconElement.classList.remove(brandIconElement.classList[i]);
    }
    brandIconElement.classList.add('pf');
    brandIconElement.classList.add(pfClass);
  };

  stripeElementChange = (element, name) => {
    if (!element.empty && element.complete) {
      this.setState({ [name]: true });
    } else {
      this.setState({ [name]: false });
    }

    if (element.brand) {
      this.setBrandIcon(element.brand);
    }
  };

  isValidForm = () => {
    const {
      cardNumber, expDate, cvc, loading
    } = this.state;
    return cardNumber && expDate && cvc && !loading;
  };

  submit = async () => {
    this.setState({
      loading: true
    });

    const {
      user, planId, coupon, countryCode, afterSubmit, token, stripe
    } = this.props;

    const userFullName = `${user.name} ${user.last_name}`;

    const { token: stripeToken } = await stripe.createToken({ name: userFullName });

    const body = {
      payment_info: {
        payment_method: stripeToken.card.brand,
        stripe_card_token: stripeToken.id,
        card_expiration_date: `${stripeToken.card.exp_month}/${stripeToken.card.exp_year}`,
        card_number: stripeToken.card.last4,
        payer_email: user.email,
        payer_name: userFullName
      },
      plan_id: planId,
      country: countryCode,
      type: 'STRIPE'
    };

    if (coupon) {
      body.coupon_id = coupon.id;
      body.trackingData = coupon.trackingData;
    }

    const response = await services.subscribe(token, body);

    await afterSubmit(response);

    this.setState({
      loading: false
    });
  };

  render() {
    const {
      cardNumber, expDate, cvc, loading
    } = this.state;
    return (
      <CheckoutContainer>
        <FormItem>
          <Label htmlFor="card-number">Ingresa el número de tarjeta (Sólo se acepta Visa o Mastercard)</Label>
          <InputWrapper style={{ display: 'flex' }} success={cardNumber}>
            <div style={{ width: '100%' }}>
              <CardNumberElement
                style={baseInputStyle()}
                id="card-number"
                onChange={element => this.stripeElementChange(element, 'cardNumber')}
              />
            </div>

            {/* <span className="brand" style={{ width: '30px' }}>
              <i className="pf pf-credit-card" id="brand-icon" />
            </span> */}
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="exp-date">Fecha de expiración</Label>
          <InputWrapper width={140} success={expDate}>
            <CardExpiryElement
              style={baseInputStyle('center')}
              id="exp-date"
              onChange={element => this.stripeElementChange(element, 'expDate')}
            />
          </InputWrapper>
        </FormItem>
        <FormItem>
          <Label htmlFor="cvc">Código de seguridad (al reverso de tu tarjeta)</Label>
          <InputWrapper width={140} success={cvc}>
            <CardCVCElement
              style={baseInputStyle('center')}
              id="cvc"
              onChange={element => this.stripeElementChange(element, 'cvc')}
            />
          </InputWrapper>
        </FormItem>
        <ButtonContainer>
          <ButtonWrapper>
            <Button
              style={{
                background: '#87E400',
                height: '38px',
                minWidth: '240px',
                cursor: loading ? 'progress' : 'pointer'
              }}
              styleClass={this.isValidForm() ? '' : 'is-dark-grey'}
              disabled={!this.isValidForm()}
              onClick={() => this.submit()}
            >
              {loading ? 'PAGANDO' : 'PAGAR'}
            </Button>
          </ButtonWrapper>
          <SSLImage>
            <div>
              <img src="/static/images/sll-encrypt-logo.svg" alt="SSL" width="104px" />
            </div>
          </SSLImage>
        </ButtonContainer>
      </CheckoutContainer>
    );
  }
}

export default injectStripe(CheckoutForm);
