import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Help = ({ visibility, toggleHelperModal }) => (
  <div className={`packages-help-more ${visibility && visibility}`}>
    <p>
¿Necesitas ayuda para realizar tu compra?
    </p>
    <p
      style={{ cursor: 'pointer' }}
      onClick={() => {
        toggleHelperModal();
      }}
    >
      <span />
      Mira como pagar
    </p>
  </div>
);

Help.propTypes = {
  visibility: PropTypes.string
};

Help.defaultProps = {
  visibility: ''
};

export default Help;
