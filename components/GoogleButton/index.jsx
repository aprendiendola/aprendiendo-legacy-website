import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import googleIcon from 'assets/images/icons/google@2x.png';
import GoogleLogin from 'react-google-login';

import './styles.scss';

const GoogleButton = ({ onLogin, onFailure, clientId }) => {
  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onLogin}
      onFailure={onFailure}
      render={renderProps => (
        <Button onClick={renderProps.onClick} styleClass="gl">
          <img src={googleIcon} alt="Google login" />
          Google
        </Button>
      )}
    />
  );
};

GoogleButton.propTypes = {
  clientId: PropTypes.string,
  onLogin: PropTypes.func,
  onFailure: PropTypes.func
};

export default GoogleButton;
