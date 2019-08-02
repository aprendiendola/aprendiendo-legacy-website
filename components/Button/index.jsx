import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({
  children, onClick, styleClass, icon, disabled, type, style
}) => (
  // eslint-disable-next-line
  <button className={`button ${styleClass}`} onClick={onClick} disabled={disabled} type={type} style={style}>
    {children}
    {icon && <img className="button-icon" alt="button icon" src={icon} />}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  styleClass: PropTypes.oneOf([
    'is-transparent',
    'is-white',
    'is-blue',
    'is-melon',
    'fb',
    'gl',
    'is-grey',
    'is-dark-grey',
    ''
  ]),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape({})
};

Button.defaultProps = {
  children: 'Example button',
  styleClass: '',
  disabled: false,
  type: 'button',
  icon: '',
  style: null
};

export default Button;
