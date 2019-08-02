import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import validationFunctions from 'utils/validation';
import validationMessages from 'utils/validation/messages';
import './styles.scss';

class Input extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validationRules: PropTypes.string,
    multipartInputOrder: PropTypes.number,
    maxlength: PropTypes.number,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    inputGroup: PropTypes.string
  };

  static defaultProps = {
    label: null,
    placeholder: '',
    validationRules: null,
    maxlength: 100,
    type: 'text',
    customErrorMessage: null,
    helpText: null
  };

  state = {
    errorMessage: null
  };

  onChange = e => {
    const { onChange, multipartInputOrder, inputGroup } = this.props;

    const isValid = this.validate(e.target.value);

    onChange(e.target.value, multipartInputOrder, inputGroup, isValid);
  };

  validate = (value = this.props.value, explicitErrorMessage) => {
    if (value === null) {
      this.setState({
        errorMessage: explicitErrorMessage
      });

      return false;
    }

    const { validationRules, customErrorMessage } = this.props;

    let valid = true;
    let errorMessage = '';
    const rules = validationRules;
    const rulesList = rules && rules.split('|');
    const customErrorMessageArr = customErrorMessage && customErrorMessage.split('|');

    let errorCounter = 0;

    // eslint-disable-next-line
    rulesList &&
      rulesList.some((ruleParam, index) => {
        if (errorCounter > 0) {
          return false;
        }

        const ruleSplit = ruleParam.split(':');
        const rule = ruleSplit[0];
        const parameters = (ruleSplit[1] || '').split(',');

        if (validationFunctions[rule] && !validationFunctions[rule].apply(null, [value, ...parameters])) {
          errorCounter += 1;
          errorMessage = (customErrorMessageArr && customErrorMessageArr[index]) || validationMessages[rule];
          valid = valid && false;
        }
      });

    this.setState({
      errorMessage
    });

    return valid;
  };

  render() {
    const { errorMessage } = this.state;

    const {
      type, label, value, maxlength, placeholder, helpText, onKeyPress, inputRef
    } = this.props;

    return (
      <div className="checkout-components-container">
        {label && (
          <label className="checkout-components-label">
            {label} <small className="checkout-components-help-text">{helpText}</small>
          </label>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={this.onChange}
          onKeyPress={onKeyPress}
          className="input"
          ref={inputRef}
        />
        {errorMessage && <div className="checkout-components-error-message">{errorMessage}</div>}
      </div>
    );
  }
}

export default Input;
