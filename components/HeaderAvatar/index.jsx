import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import './styles.scss';

class HeaderAvatar extends PureComponent {
  render() {
    const { name, size, isPremium } = this.props;
    return (
      <Avatar
        round
        name={name}
        maxInitials={1}
        size={size || '34'}
        textSizeRatio={1.5}
        color={isPremium ?
          "linear-gradient(47deg, #1A4292, #4267B2)":
          "linear-gradient(47deg, #4e87d0, #7edfb5)"}
        style={{ cursor: 'pointer', fontWeight: '900' }}
      />
    );
  }
}

HeaderAvatar.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.number
};

export default HeaderAvatar;
