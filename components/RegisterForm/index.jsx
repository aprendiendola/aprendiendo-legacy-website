import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';

import './styles.scss';

const getValidationSchema = (isSocial, initialValues) => {
  const schema = {};

  if (!isSocial) {
    schema.name = Yup.string()
      .max(100, 'Tus nombres deben ser de 100 carácteres como máximo')
      .required('Ingresa tus nombres');
    schema.lastname = Yup.string()
      .max(100, 'Tus apellidos deben ser de 100 carácteres como máximo')
      .required('Ingresa tus apellidos');
    schema.email = Yup.string()
      .max(150, 'Tu email debe ser de 150 carácteres como máximo')
      .email('Ingresa un email valido')
      .required('Ingresa tu correo electrónico');
    schema.password = Yup.string()
      .max(60, 'Tu email debe ser de 60 carácteres como máximo')
      .min(8, 'La contraseña debe ser de 8 carácteres como mínimo')
      .required('Ingresa tu contraseña');
  }

  if (isSocial && !initialValues.email) {
    schema.email = Yup.string()
      .max(150, 'Tu email debe ser de 150 carácteres como máximo')
      .email('Ingresa un email valido')
      .required('Ingresa tu correo electrónico');
  }

  schema.cellphone = Yup.string().matches(
    /^([9][0-9]{8}|999999999)$/,
    'Por favor, ingresa un número de celular válido'
  );
  schema.university = Yup.number().required('Debes seleccionar tu universidad');
  schema.career = Yup.number().required('Debes seleccionar tu carrera');

  return schema;
};

const RegisterForm = ({
  universities,
  onUniversityChange,
  careers,
  onSubmit,
  loading,
  initialValues,
  isSocial
}) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    validationSchema={Yup.object().shape(getValidationSchema(isSocial, initialValues))}
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
          <div className="register-form">
            <div className="register-fields-horizontal-form">
              <Input
                id="name"
                label="Nombres"
                value={values.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors.name && touched.name}
                errorMessage={errors.name || ''}
                hidden={isSocial}
              />
              <Input
                id="lastname"
                label="Apellidos"
                value={values.lastname}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors.lastname && touched.lastname}
                errorMessage={errors.lastname || ''}
                hidden={isSocial}
              />
            </div>
            <div className="register-fields-form">
              {(!isSocial || (isSocial && !initialValues.email)) && (
                <Input
                  id="email"
                  label="Correo"
                  value={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors.email && touched.email}
                  errorMessage={errors.email || ''}
                  hidden={isSocial && initialValues.email !== undefined}
                />
              )}
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
                hidden={isSocial}
              />
              <Input
                id="cellphone"
                label="Celular"
                value={values.cellphone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors.cellphone && touched.cellphone}
                errorMessage={errors.cellphone || ''}
              />
              <Select
                id="university"
                label="Universidad"
                handleChange={e => {
                  handleChange(e);
                  onUniversityChange(e.target.value);
                }}
                handleBlur={handleBlur}
                value={values.university}
                placeholder="Selecciona tu universidad"
                items={universities}
                hasError={errors.university && touched.university}
                errorMessage={errors.university || ''}
              />
              <Select
                id="career"
                label="Carreras"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.career}
                placeholder="Selecciona tu carrera"
                items={careers}
                hasError={errors.career && touched.career}
                errorMessage={errors.career || ''}
              />
            </div>
            <div className="register-action-form">
              <Button
                type="submit"
                style={{
                  color: '#fff',
                  background: '#1178f2',
                  height: '47px',
                  fontSize: '20px'
                }}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Regístrate'}
              </Button>
            </div>
          </div>
        </form>
      );
    }}
  </Formik>
);

RegisterForm.defaultProps = {
  universities: [],
  careers: []
};

export default RegisterForm;
