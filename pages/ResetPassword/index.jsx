/* eslint import/no-unresolved: 0 */
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { getUrlParams } from 'utils/common';
import Input from '../Checkout/components/Input';
import Button from 'components/Button';
import MessageError from 'components/MessageError';
import fetchData from '../../services/fetch';
import './styles.scss';
import SuccessMessage from './components/SuccessMessage';
import extractErrorMessage from '../../utils/errorMessage';

const endpoint = process.env.REACT_APP_APRENDIENDO_API_URL;

class ResetPassword extends Component {
  refFields = {};

  errorMessages = [];

  state = {
    fields: {
      password: {
        value: '',
        isValid: false,
        customErrorMessage: ''
      },
      passwordConfirmation: {
        value: '',
        isValid: false,
        customErrorMessage: ''
      },
      token: {
        value: '',
        isValid: true
      },
      email: {
        value: '',
        isValid: true
      }
    },
    loading: false,
    hasError: false,
    wasSent: false,
  };

  componentDidMount() {
    const { router } = this.props;
    const { email, token } = getUrlParams(router.asPath);
    const { fields } = this.state;
    fields.email.value = email;
    fields.token.value = token;
    this.setState({ fields });
    this.errorMessages = [];
  }

  onInputChange = (val, _, input, isValid) => {
    const { fields } = this.state;

    fields[input].value = val;
    fields[input].isValid = isValid;

    this.setState({ fields });
  }

  onEnter = e => {
    if (e.key === 'Enter') {
      this.resetPassword();
    }
  }

  isValidForm = () => {
    return (
      Object
        .keys(this.refFields)
        .map(field => this.refFields[field].validate())
        .reduce((count, validField) => count + (!validField ? 1 : 0), 0) === 0
    );
  }

  resetPassword = async () => {
    if (this.isValidForm()) {
      const {
        fields: {
          password,
          passwordConfirmation,
          email,
          token
        }
      } = this.state;
      this.setState({ loading: true, hasError: false });
      this.errorMessages = [];
      try {
        await fetchData({
          method: 'POST',
          url: `${endpoint}/api/password/reset`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          data: {
            password: password.value,
            password_confirmation: passwordConfirmation.value,
            email: email.value,
            token: token.value,
          },
        });
        this.handleWasSent(true);
      } catch (err) {
        this.errorMessages = extractErrorMessage(err);

        this.setState({ hasError: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleWasSent = (status = false) => {
    this.setState({ wasSent: status });
  }

  render() {
    const {
      loading, fields, hasError, wasSent
    } = this.state;
    const {
      password,
      passwordConfirmation,
      email,
      token
    } = fields;
    const { history } = this.props;

    return wasSent ? <SuccessMessage history={history} /> : (
      <div className="reset-password-general">
        <div className="reset-password-inner">
          {hasError && this.errorMessages.map(errorMessage => <MessageError error={errorMessage} />)}
          <h1 className="reset-password-page-title">
            CAMBIA TU CONTRASEÑA
          </h1>
          <div className="reset-password-email">
            <div>
              <Input
                label="Nueva Contraseña"
                type="password"
                onChange={this.onInputChange}
                onKeyPress={(e => this.onEnter(e))}
                multipartInputOrder={1}
                inputGroup="password"
                ref={input => { this.refFields.password = input; }}
                validationRules="required|minLength:8"
                customErrorMessage="Ingresa tu contraseña|La contraseña debe ser de 8 caracteres como mínimo"
                value={password.value}
              />
              <Input
                label="Reingresa tu nueva contraseña"
                type="password"
                onChange={this.onInputChange}
                onKeyPress={(e => this.onEnter(e))}
                multipartInputOrder={2}
                inputGroup="passwordConfirmation"
                ref={input => { this.refFields.passwordConfirmation = input; }}
                validationRules="required|minLength:8"
                customErrorMessage="Confirma tu password|La contraseña debe ser de 8 caracteres como mínimo"
                value={passwordConfirmation.value}
              />
              <Input
                type="hidden"
                value={email.value}
                multipartInputOrder={3}
                inputGroup="email"
                ref={input => { this.refFields.email = input; }}
              />
              <Input
                type="hidden"
                value={token.value}
                multipartInputOrder={4}
                inputGroup="token"
                ref={input => { this.refFields.token = input; }}
              />
              <div className="reset-password-email-action">
                <Button style={{ color: '#fff' }} onClick={this.resetPassword}>
                  {loading ? 'Cargando...' : 'Guardar cambios'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
