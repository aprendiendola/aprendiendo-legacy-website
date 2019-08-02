import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import facebookIcon from 'assets/images/icons/facebook@2x.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './styles.scss';

const FacebookButton = ({ onLogin, appId }) => {
  return (
    <FacebookLogin
      appId={appId}
      isMobile={false}
      fields="name,email,picture, last_name, first_name"
      callback={onLogin}
      render={renderProps => (
        <Button onClick={renderProps.onClick} styleClass="fb">
          <img src={facebookIcon} alt="Facebook login" />
          Facebook
        </Button>
      )}
    />
  );
};

FacebookButton.propTypes = {
  /**
   * Facebook App Id
   */
  appId: PropTypes.string,
  onLogin: PropTypes.func
};

export default FacebookButton;
