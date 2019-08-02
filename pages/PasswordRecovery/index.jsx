/* eslint import/no-unresolved: 0 */
import React, { Component } from 'react';
import { CustomLink } from 'components';
import Input from '../Checkout/components/Input';
import Button from 'components/Button';
import MessageError from 'components/MessageError';
import fetchData from '../../services/fetch';
import './styles.scss';
import SuccessMessage from './components/SuccessMessage';

const errorMessage = 'Ocurrió un error inesperado';
const endpoint = process.env.REACT_APP_APRENDIENDO_API_URL;

class PasswordRecovery extends Component {
  refFields = {};

  state = {
    fields: {
      email: {
        value: '',
        isValid: false,
        customErrorMessage: ''
      }
    },
    loading: false,
    hasError: false,
    wasSent: false
  };

  onInputChange = (val, _, input, isValid) => {
    const { fields } = this.state;

    fields[input].value = val;
    fields[input].isValid = isValid;

    this.setState({ fields });
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      this.requestResetToken();
    }
  };

  isValidForm = () => {
    return (
      Object.keys(this.refFields)
        .map(field => this.refFields[field].validate())
        .reduce((count, validField) => count + (!validField ? 1 : 0), 0) === 0
    );
  };

  requestResetToken = async () => {
    if (this.isValidForm()) {
      const {
        fields: { email }
      } = this.state;
      this.setState({ loading: true, hasError: false });
      try {
        await fetchData({
          method: 'POST',
          url: `${endpoint}/api/password/email`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          data: { email: email.value }
        });
        this.handleWasSent(true);
      } catch (error) {
        this.setState({ hasError: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  handleWasSent = (status = false) => {
    this.setState({ wasSent: status });
  };

  render() {
    const {
      loading, fields, hasError, wasSent
    } = this.state;
    const { email } = fields;

    return wasSent ? (
      <SuccessMessage handleWasSent={this.handleWasSent} />
    ) : (
      <div className="password-recovery-general">
        <div className="password-recovery-inner">
          {hasError && <MessageError error={errorMessage} />}
          <h1 className="password-recovery-page-title">Recupera tu contraseña</h1>
          <div className="password-recovery-email">
            <h2 className="password-recovery-email-title">Ingresa tu correo para recuperar tu contraseña</h2>
            <div>
              <Input
                label="Correo"
                onChange={this.onInputChange}
                ref={input => {
                  this.refFields.email = input;
                }}
                multipartInputOrder={1}
                inputGroup="email"
                validationRules="required|email"
                customErrorMessage="Ingresa tu correo|Por favor ingresa una dirección de correo válida."
                value={email.value}
              />
              <div className="password-recovery-email-action">
                <Button style={{ color: '#fff' }} onClick={this.requestResetToken}>
                  {loading ? 'Cargando...' : 'Enviar'}
                </Button>
                <p className="password-recovery-back-link">
                  <small>
                    <strong>
                      <CustomLink path="/login">Volver</CustomLink>
                    </strong>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordRecovery;
