import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { CustomLink, Paragraph } from 'components';

import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';

const LoginForm = ({ onSubmit, loading }) => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email('El correo que ingresaste no es correcto')
        .required('Ingresa tu correo electrónico'),
      password: Yup.string().required('Ingresa tu contraseña')
    })}
    onSubmit={values => {
      onSubmit(values);
    }}
  >
    {props => {
      const {
        values, touched, errors, handleChange, handleBlur, handleSubmit
      } = props;

      return (
        <form onSubmit={handleSubmit}>
          <div className="login-email-form">
            <Input
              id="email"
              label="Correo"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              hasError={errors.email && touched.email}
              errorMessage={errors.email || ''}
            />
            <Input
              id="password"
              label="Contraseña"
              value={values.password}
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              hasError={errors.password && touched.password}
              errorMessage={errors.password || ''}
              helpText="(8 carácteres como mínimo)"
            />
            <div className="login-recover-password-form">
              <Paragraph style={{ fontSize: '16px', fontWeight: '500', marginBottom: '0px' }} color="#0fa3f4" textAlign="left" marginBottom="30px">
                <CustomLink path="/recuperar-password">

                  <span
                    style={{ marginLeft: '3px', cursor: 'pointer' }}
                    role="presentation"
                  >
                    {'¿Olvidaste tu contraseña?'}
                  </span>
                </CustomLink>
              </Paragraph>
            </div>

            <div className="login-email-action-form">
              <Button
                style={{
                  color: '#fff',
                  background: '#1178f2',
                  height: '47px',
                  fontSize: '20px'
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Ingresar'}
              </Button>
            </div>
          </div>
        </form>
      );
    }}
  </Formik>
);

LoginForm.defaultProps = {
  universities: [],
  careers: []
};

export default LoginForm;
