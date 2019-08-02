import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import { LargeButton } from 'components';
import { FormItem, FormLabel } from '../styles';

const constants = {
  LABEL_CURRENT_PASSWORD: 'Contraseña actual',
  LABEL_NEW_PASSWORD: 'Nueva contraseña',
  LABEL_CONFIRM_CURRENT_PASSWORD: 'Confirma tu contraseña actual',
  LABEL_INSERT_NEW_PASSWORD: 'Ingresa la nueva contraseña',
  LABEL_CONFIRM_NEW_PASSWORD: 'Confirmar nueva contraseña',
  ERROR_MSG_SHORT_PASSWORD: 'La contraseña debe ser de 8 caracteres como mínimo.',
  ERROR_MSG_REQUIRED: 'Campo obligatorio.',
  ERROR_MSG_PASSWORD_DONT_MATCH: 'Las contraseñas no coinciden.',
  ERROR_MSG_WRONG_PASSWORD_PROVIDED: 'La contraseña ingresada es incorrecta.',
  BUTTON_UPDATE_PASSWORD: 'Cambiar contraseña',
  BUTTON_LOADING: 'Cargando...'
};

const UpdatePasswordForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }}
    validationSchema={Yup.object().shape({
      currentPassword: Yup.string()
        .required(constants.ERROR_MSG_REQUIRED)
        .min(8, constants.ERROR_MSG_SHORT_PASSWORD),
      newPassword: Yup.string()
        .required(constants.ERROR_MSG_REQUIRED)
        .min(8, constants.ERROR_MSG_SHORT_PASSWORD),
      confirmPassword: Yup.string()
        .required(constants.ERROR_MSG_REQUIRED)
        .oneOf([Yup.ref('newPassword'), null], constants.ERROR_MSG_PASSWORD_DONT_MATCH)
    })}
    onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
      onSubmit(values).then(status => {
        setSubmitting(false);

        if (status === 403) {
          setErrors({
            currentPassword: constants.ERROR_MSG_WRONG_PASSWORD_PROVIDED
          });
        }

        if (!status) {
          resetForm();
        }
      });
    }}
  >
    {props => {
      const {
 values, isSubmitting, touched, errors, handleChange, handleBlur, handleSubmit
} = props;
      return (
        <form onSubmit={handleSubmit} style={{ padding: '10px 0px' }}>
          <FormItem>
            <FormLabel>{constants.LABEL_CONFIRM_CURRENT_PASSWORD}</FormLabel>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder={constants.LABEL_CURRENT_PASSWORD}
              handleChange={handleChange}
              handleBlur={handleBlur}
              hasError={errors.currentPassword && touched.currentPassword}
              errorMessage={errors.currentPassword}
              value={values.currentPassword}
              style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
            />
          </FormItem>
          <FormItem>
            <FormLabel>{constants.LABEL_NEW_PASSWORD}</FormLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder={constants.LABEL_NEW_PASSWORD}
              handleChange={handleChange}
              handleBlur={handleBlur}
              hasError={errors.newPassword && touched.newPassword}
              errorMessage={errors.newPassword || ''}
              value={values.newPassword}
              style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
            />
          </FormItem>
          <FormItem>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={constants.LABEL_CONFIRM_NEW_PASSWORD}
              handleChange={handleChange}
              handleBlur={handleBlur}
              hasError={errors.confirmPassword && touched.confirmPassword}
              errorMessage={errors.confirmPassword || ''}
              value={values.confirmPassword}
              style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
            />
          </FormItem>
          <LargeButton style={{ width: '200px' }} type="submit" loading={isSubmitting}>
            {isSubmitting ? constants.BUTTON_LOADING : constants.BUTTON_UPDATE_PASSWORD}
          </LargeButton>
        </form>
      );
    }}
  </Formik>
);

export default UpdatePasswordForm;
