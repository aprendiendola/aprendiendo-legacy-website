import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'components/RadioButton';
import LoadingFilter from './components/LoadingFilter';
import './styles.scss';

const RadioButtonGroup = props => {
  const {
    title, isLoading, children, name, onChange, value
  } = props;
  return (
    <div className="container-radio-button-group">
      <span className="label-radio-button-group">{title}</span>
      <div>
        {isLoading ? (
          <LoadingFilter />
        ) : (
          React.Children.map(children, child => (
            <RadioButton
              key={`radio-${child.props.value}`}
              name={name}
              onChange={onChange}
              checked={value === child.props.value}
              {...child.props}
            />
          ))
        )}
      </div>
    </div>
  );
};

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

RadioButtonGroup.defaultProps = {
  title: '',
  isLoading: false
};

export default RadioButtonGroup;
