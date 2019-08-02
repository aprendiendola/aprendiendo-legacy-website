import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Floater from 'react-floater';
import facebookPixel from 'utils/facebook';
import { splitUrl } from 'utils/common';
import { CustomLink, Label } from 'components';
import Logo from 'components/Logo';
import HamburgerMenu from 'components/HamburgerMenu';
import Searchbar from 'components/Searchbar';
import Badge from 'components/Badge';
import HeaderAvatar from 'components/HeaderAvatar';
import { getUrlParams } from 'utils/common';
import Sidenav from 'components/Sidenav';
import logoIcon from 'assets/images/aprendiendo-logo.svg';
import hamburgerIcon from 'assets/images/course-menu-icon.png';
import userNoLoginIcon from 'assets/images/user-no-login-icon.png';
import premiumLogo from 'assets/images/crown.svg';
import zoomIcon from 'assets/images/icons/zoom-icon.svg';
import service from 'services';
import LogoutPopover from './components/LogoutPopover';
import CouponTooltip from './components/CouponTooltip';
import { clearCart } from '../../reducers/shoppingCart';
import { authToInitialState } from '../../reducers/auth';
import { clearUserCourses } from '../../reducers/courses';
import { Router } from 'routes';
import { Container, ContactContainer, WhatsappLogo } from './styles';
import Experiment from 'components/Experiment';
import { ShakeHorizontal } from 'reshake';
import couponIcon from 'assets/images/icons/coupon_icon.svg';
import { CONTACT_NUMBER } from 'constants';

// NOTE: For experiment
import { clearCoupon } from '../../reducers/coupons';

import './styles.scss';

const { pushRoute } = Router;

const PremiumButton = ({ user, router }) => {
  if (
    (router && router.pathname === '/Subscription') ||
    (user && user.access_type === 'subscribed') ||
    (user && user.access_type === 'freezed')
  ) {
    return <div />;
  }
  return (
    <CustomLink path="/suscripcion">
      <div className="link-sign-up-header">
        <div className="button-strong-header">Vuélvete Premium</div>
      </div>
    </CustomLink>
  );
};

const UnSignInButtons = ({ token, router, extraQuery }) => {
  return (
    <div className="login-wrapper-header">
      <CustomLink path={`/login${extraQuery}`}>
        <a className="enter-option-header">Iniciar Sesión</a>
      </CustomLink>
      <CustomLink path={`/registro${extraQuery}`}>
        <a className="link-sign-up-header">
          <div className="button-sign-up-outline-header">Regístrate</div>
        </a>
      </CustomLink>
      <PremiumButton router={router} />
    </div>
  );
};

const ShoppingCartBadge = ({ shoppingCartCounter, user }) => {
  if (!user) {
    return <div />;
  }
  return <Badge number={shoppingCartCounter} maxNumber={9} url="/carrito" />;
};

const MyCourses = () => {
  return (
    <CustomLink path="/perfil">
      <a className="my-courses-link-header enter-courses-header">Mis cursos</a>
    </CustomLink>
  );
};

class Header extends PureComponent {
  state = {
    searchActive: false,
    isOpenSidenav: false,
    popoverIsVisible: false,
    token: null,
    user: null,
    extraQuery: ''
  };

  componentDidMount() {
    const { token, user, router } = this.props;

    const { referral_id: referralId } = getUrlParams(
      router.asPath
    );

    if (referralId) {
      this.setState({
        extraQuery: `?referral_id=${referralId}`
      });
    }

    if (token !== null) {
      this.setState({
        token,
        user
      });
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { token, user } = nextProps;
    return {
      token,
      user
    };
  }

  componentDidUpdate(prevProps) {
    const { isCheckout } = this.props;

    // if (prevProps.path !== '/cursos/search' && !isCheckout && router.pathname !== '/CourseDetail') {
    //   this.searchbarDesktop.cleanSearch();
    //   this.searchbar.cleanSearch();
    // }
  }

  onSearchButtonClick = () => {
    this.toggleSearchbar();
    this.redirectSearch(this.searchbar.state.value);
  };

  onLogout = () => {
    const {
      clearCartItems, clearAuth, router, clearUserCourses, clearCouponState
    } = this.props;
    this.setState({ popoverIsVisible: false }, () => {
      localStorage.clear();
      clearCartItems();
      clearAuth();
      clearUserCourses();
      pushRoute(`/${service.getCountry().countryCode}/cursos`);

      // NOTE: For experiment
      clearCouponState();
    });
  };

  onOutsideClick = () => {
    this.toggleSearchbar();
  };

  onBecomeTeacher = () => {
    if (typeof window !== 'undefined') {
      facebookPixel.becomeTeacher();
      window.open('https://profesores.aprendiendo.la', '_blank');
    }
  };

  setSearch = e => {
    if (e.key === 'Enter') {
      this.redirectSearch(e.target.value);
    }
  };

  redirectSearch = query => {
    if (query !== '') {
      facebookPixel.searchTrack(query);
    }
    Router.replace(`/${service.getCountry().countryCode}/cursos?search=${query}`);
  };

  toggleSearchbar = () => this.setState({ searchActive: !this.state.searchActive });

  toggleSidenav = () => {
    this.setState({ isOpenSidenav: !this.state.isOpenSidenav }, () => {
      if (this.state.isOpenSidenav === true) {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = 'no';
      } else {
        document.documentElement.style.overflow = 'auto';
        document.body.scroll = 'yes';
      }
    });
  };

  showLogoutPopover = () => {
    const { user } = this.props;
    const { popoverIsVisible } = this.state;
    if (user) {
      this.setState({ popoverIsVisible: !popoverIsVisible });
    }
  };

  signedLinks() {
    const { popoverIsVisible, token, user, extraQuery } = this.state;
    const {
      router, coupon, couponCode, isSubscription
    } = this.props;

    if (token) {
      return (
        <div className="signed-links-header">
          <MyCourses />
          <div role="presentation" className="user-image-header" onClick={() => this.showLogoutPopover()}>
            <div style={{ position: 'relative' }}>
              {
                user && user.access_type === 'subscribed' && (
                  <img style={{
                    position: 'absolute',
                    width: 15,
                    left: 8,
                    bottom: 23
                    }}
                    src={premiumLogo}
                    alt='premium-logo'
                  />
                )
              }
              <HeaderAvatar
                name={user && `${user.name}`}
                icon={(user && user.avatar) || userNoLoginIcon}
                size="30"
                isPremium={user && user.access_type === 'subscribed'}  
              />
            </div>
            <LogoutPopover
              isVisible={popoverIsVisible}
              onMouseLeave={this.showLogoutPopover}
              onLogout={this.onLogout}
            />
          </div>
          <PremiumButton user={user} router={router} />
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UnSignInButtons token={token} icon={userNoLoginIcon} router={router} extraQuery={extraQuery} />
      </div>
    );
  }

  render() {
    const { searchActive, isOpenSidenav, user, extraQuery } = this.state;
    const {
      shoppingCartCounter, isCheckout, isSubscription, router
    } = this.props;

    if (isCheckout) {
      return (
        <Container>
          <Logo logoUrl={logoIcon} user={user} />
          <ContactContainer>
            <Label align="center" fontSize="14px" color="#626262" paddingRight="5px">
              ¿Necesitas ayuda?
            </Label>
            <WhatsappLogo />
            <ContactContainer>
              <a href={`https://wa.me/51${CONTACT_NUMBER}`} target="blank">
                {CONTACT_NUMBER}
              </a>
            </ContactContainer>
          </ContactContainer>
        </Container>
      );
    }

    return (
      <div
        className="container-header"
        style={{ background: this.props.isDark ? '#424042' : '#fff', position: isSubscription && 'fixed' }}
      >
        <div className="content-container-header">
          <div className="container-logo-menu-header">
            <Logo logoUrl={logoIcon} user={user} />
            <div className="sidenav-hamburger-header">
              <HamburgerMenu hamburgerUrl={hamburgerIcon} onOpenSideNav={this.toggleSidenav} />
            </div>

            <div className="course-link-wrapper-header">
              {!user && (
                  <a
                    onClick={() => Router.replace(`/${service.getCountry().countryCode}/cursos`)}
                  >
                    <span className="course-link-tag-header">Cursos</span>
                  </a>
              )}
            </div>
            {!isSubscription && (
              <div className="search-wrapper-header">
                <div className="search-header">
                  <Searchbar
                    isCourseDetail={router.pathname === '/CourseDetail'}
                    onEnter={this.setSearch}
                    toggleSearchBar={() => this.toggleSearchbar()}
                    ref={input => {
                      this.searchbarDesktop = input;
                    }}
                    isDark={this.props.isDark}
                  />
                </div>
              </div>
            )}
          </div>

          <Sidenav isOpenSidenav={isOpenSidenav} onCloseSideNav={this.toggleSidenav} user={user} />

          <div
            role="presentation"
            className={isOpenSidenav ? 'active-header' : ''}
            onClick={this.toggleSidenav}
          />

          <div className="shopping-cart-wrapper-header">
            {!isSubscription && (
              <div className="search-icon">
                <img src={zoomIcon} style={{ cursor: 'pointer' }} onClick={() => this.toggleSearchbar()} />
              </div>
            )}
            {this.signedLinks()}
          </div>

          <div className={`search-mobile-wrapper-header ${searchActive ? 'is-visible-header' : ''}`}>
            {!isSubscription && (
              <Searchbar
                isMobile
                toggleSearchBar={() => this.toggleSearchbar()}
                onEnter={this.setSearch}
                ref={input => {
                  this.searchbar = input;
                }}
              />
            )}
          </div>
          <div
            role="presentation"
            className={`overflow-mask-header ${searchActive ? 'is-visible-header' : ''}`}
            onClick={() => this.onOutsideClick()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ wishlist, auth, coupons }) => {
  return {
    shoppingCartCounter: wishlist.counter,
    token: auth.token,
    user: auth.user,
    coupon: coupons.coupon,
    couponCode: coupons.couponCode
  };
};

const mapDispatchToProps = {
  clearCartItems: () => clearCart(),
  clearUserCourses: () => clearUserCourses(),
  clearAuth: () => authToInitialState(),
  // NOTE: For experiment
  clearCouponState: () => clearCoupon()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
