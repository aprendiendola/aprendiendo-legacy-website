import React from 'react';
import { Formik } from 'formik';

import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';

const CouponForm = ({
  onSubmit, loading, couponCode, couponError
}) => (
  <Formik
    initialValues={{
      couponCode
    }}
    onSubmit={values => {
      onSubmit(values);
    }}
  >
    {props => {
      const {
 values, handleChange, handleBlur, handleSubmit
} = props;

      return (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '175px' }}>
              <Input
                id="couponCode"
                label="¿Tienes un cupón de descuento?"
                value={values.couponCode}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={couponError !== null}
                errorMessage={couponError}
                placeholder="Escríbelo aquí"
                style={{
                  padding: '6px 15px',
                  width: '175px',
                  fontSize: '12px',
                  marginTop: '5px'
                }}
                labelStyle={{ fontSize: '12px', color: '#969696', fontWeight: 600 }}
              />
            </div>
            <div style={{ paddingTop: 20, marginLeft: 8, width: '100px' }}>
              <Button
                type="submit"
                disabled={loading}
                style={{ padding: '7px 15px', marginTop: '4px', fontSize: '14px' }}
              >
                {loading ? 'Cargando...' : 'Aplicar'}
              </Button>
            </div>
          </div>
        </form>
      );
    }}
  </Formik>
);

export default CouponForm;
