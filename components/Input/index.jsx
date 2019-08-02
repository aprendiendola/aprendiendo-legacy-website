import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

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
  <div className="container-input">
    {label
      && !hidden && (
        // eslint-disable-next-line
        <label className="label-input" htmlFor={id} style={labelStyle}>
          {label}
          <small className="help-text-input">
            {` ${helpText}`}
          </small>
        </label>
      )}
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className="input-general"
      onChange={handleChange}
      onBlur={handleBlur}
      hidden={hidden}
      style={style}
    />
    {hasError && !hidden && (
    <div className="error-message-input">
      {errorMessage}
    </div>
)}
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
