import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import hamburgerIcon from 'assets/images/icons/hamburger-icon.svg';
import './styles.scss';


class HamburgerMenu extends PureComponent {
  render() {
    const {
      onOpenSideNav,
    } = this.props;

    return (
      <img
        alt="hamburger"
        src={hamburgerIcon}
        onClick={onOpenSideNav}
        style={{ cursor: 'pointer' }}
      />
    );
  }
}

HamburgerMenu.propTypes = {
  onOpenSideNav: PropTypes.func
};

export default HamburgerMenu;
