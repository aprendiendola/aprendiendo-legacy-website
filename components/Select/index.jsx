import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Select = ({
  id,
  label,
  placeholder,
  hasError,
  errorMessage,
  value,
  handleChange,
  handleBlur,
  items,
  style
}) => (
  <div className="container-select" style={style}>
    {label && (
      // eslint-disable-next-line
      <label className="label-select" htmlFor={id}>
        {label}
      </label>
    )}
    <select id={id} className="select-general" value={value} onChange={handleChange} onBlur={handleBlur}>
      <option disabled value="">
        {placeholder}
      </option>
      {items &&
        items.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
    </select>
    {hasError && <div className="error-message-select">{errorMessage}</div>}
  </div>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({}))
};

Select.defaultProps = {
  label: '',
  placeholder: '',
  errorMessage: '',
  hasError: false,
  items: []
};

export default Select;
