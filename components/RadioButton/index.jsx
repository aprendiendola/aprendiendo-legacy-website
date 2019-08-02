import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class RadioButton extends PureComponent {
  static propTypes = {
    label: PropTypes.node,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    label: null,
  };

  onChange = (e) => {
    const {
      onChange,
    } = this.props;

    onChange(e.target.value);
  };

  render() {
    const {
      name,
      label,
      value,
      checked,
    } = this.props;
    return (
      <div className="container-radio-button">
        <input
          type="radio"
          id={`radio-${value}-${name}`}
          name={name}
          value={value}
          checked={checked}
          onChange={this.onChange}
          className="radio-radio-button"
        />
        {label && <label htmlFor={`radio-${value}-${name}`} className="label-radio-button">{label}</label>}
      </div>
    );
  }
}

export default RadioButton;
