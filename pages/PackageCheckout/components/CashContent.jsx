import React, { Fragment } from 'react';
import '../styles.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/Button';
import Input from 'components/Input';
import { StepContainer, Step, StepTag, StepText } from 'components/YapeModal/styles';
import { CONTACT_NUMBER } from 'constants';

import { TextContainer } from './styles';
import PaymentLoading from './PaymentLoading';

const CashContent = ({ loading, processCashPayment }) => (
  <Fragment>
    {loading ? (
      <PaymentLoading />
    ) : (
      <Formik
        initialValues={{
          dni: ''
        }}
        validationSchema={Yup.object().shape({
          dni: Yup.string().min(8, 'Por favor, ingresa un DNI válido')
        })}
        onSubmit={values => {
          processCashPayment(values.dni);
        }}
      >
        {({
 values, touched, errors, handleChange, handleBlur, handleSubmit
}) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="checkout-option-content">
                {/* <TextContainer>
                  <p>
                    {'Realiza una transferencia / depósito a la siguiente'}
                    <strong>
                      {'cuenta de ahorro (en soles):'}
                    </strong>
                    {''}
                  </p>
                </TextContainer>
                <div className="checkout-input checkout-input-cid">
                  <p className="checkout-label">
                    {'Ingresa tu DNI'}
                  </p>
                  <Input
                    id="dni"
                    placeholder="- - - - - - - -"
                    maxlength={8}
                    value={values.dni}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    hasError={errors.dni && touched.dni}
                    errorMessage={errors.dni || ''}
                  />
                </div>
                <div className="checkout-option-action">
                  <Button
                    type="submit"
                    styleClass={errors.dni || values.dni === '' ? 'is-dark-grey' : 'is-blue'}
                  >
                    PAGAR
                  </Button>
                </div> */}

                <StepContainer>
                  <Step>
                    <StepTag>Paso 1</StepTag>
                    <StepText>
                      <p>
                        {'Realiza una transferencia / depósito a la siguiente cuenta de ahorro (en soles):'}
                      </p>
                      <p className="number">194-17793542-0-73</p>
                      <p>A nombre de Jose Antonio Rosazza.</p>
                    </StepText>
                  </Step>

                  <Step>
                    <StepTag>Paso 2</StepTag>
                    <StepText>
                      <p>
                        {'Comunícate con nosotros* por'} <span className="whatsapp">Whatsapp</span>{' '}
                        {'al número:'}
                        <span className="whatsapp">
                          <a href={`https://wa.me/51${CONTACT_NUMBER}`} target="blank">
                            {CONTACT_NUMBER}
                          </a>
                        </span>
                      </p>

                      <p style={{ fontWeight: 'bold' }}>
                        {'Tu nombre y el correo de tu cuenta en Aprendiendo.la'}
                      </p>

                      <p>Te daremos acceso a tus clases al confirmar tu pago.</p>

                      <p>*Atendemos todos los días de 9:00am a 7:00pm.</p>
                    </StepText>
                  </Step>
                </StepContainer>

                <p>
                  {/* <small className="small-text">
                    Al confirmar tu compra aceptas los
                    {' '}
                    <a href="https://aprendiendo.la/pe/condiciones-de-uso">
                      {'Términos y condiciones'}
                    </a>
                  </small> */}
                </p>
              </div>
            </form>
          );
        }}
      </Formik>
    )}
  </Fragment>
);

export default CashContent;
