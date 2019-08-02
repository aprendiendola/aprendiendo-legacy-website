import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const MessageError = props => {
  return (
    <div className="msg-error">
      {props.error}
    </div>
  );
};

MessageError.propTypes = {
  error: PropTypes.string
};

export default MessageError;
