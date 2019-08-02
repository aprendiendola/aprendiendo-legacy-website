import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from './styles';

const Input = ({
  id,
  label,
  placeholder,
  hasError,
  errorMessage,
  helpText,
  value,
  handleChange,
  handleBlur,
  type,
  hidden,
  style,
  labelStyle
}) => (
  <div style={{ marginBottom: '5px' }}>
    {label && !hidden && (
      // eslint-disable-next-line
      <label
        style={{
          color: `${({ theme }) => theme.color.grey}`,
          fontSize: '14px',
          marginBottom: '5px',
          width: '100%'
        }}
        htmlFor={id}
      >
        {label}
        <small style={{ fontWeight: 400 }}>{` ${helpText}`}</small>
      </label>
    )}
    <StyledInput
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      hidden={hidden}
      style={style}
    />
    {/* {hasError && !hidden && <div className="error-message-input">{errorMessage}</div>} */}
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  hidden: PropTypes.bool,
  style: PropTypes.shape({}),
  labelStyle: PropTypes.shape({})
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  errorMessage: '',
  hasError: false,
  helpText: '',
  value: '',
  type: 'text',
  hidden: false,
  style: null,
  labelStyle: null
};

export default Input;
