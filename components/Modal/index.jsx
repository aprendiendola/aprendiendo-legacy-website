import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  hideClose: PropTypes.bool,
  fullScreen: PropTypes.bool,
  children: PropTypes.node,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
};

const defaultProps = {
  hideClose: false,
  fullScreen: false,
  children: 'Add content through children nodes',
  large: false,
  extraLarge: false
};

const Modal = ({
  active,
  handleClose,
  hideClose,
  fullScreen,
  children,
  large,
  extraLarge,
  removeOverflow
}) => (
  <div className={`modal ${active ? 'is-active' : ''}`}>
    <div className="modal-background" onClick={handleClose} />
    <div
      className={`modal-content ${fullScreen ? 'is-full-screen' : ''} ${large ? 'is-large' : ''} ${
        extraLarge ? 'is-extra-large' : ''
      }`}
      style={{ overflow: removeOverflow ? 'initial' : 'auto' }}
    >
      {children}
    </div>
    {!hideClose ? <button className="modal-close is-large" onClick={handleClose} /> : ''}
  </div>
);

Modal.propTypes = propTypes;

Modal.defaultProps = defaultProps;

export default Modal;
