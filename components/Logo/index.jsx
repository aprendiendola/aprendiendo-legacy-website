import React, { PureComponent } from 'react';
import { Router } from "routes";
import service from "services";
import './styles.scss';

class Logo extends PureComponent {
  render() {
    const { logoUrl, user } = this.props;
    return (
        <a
          className="logo-general"
          onClick={() => Router.replace(user ? `/${service.getCountry().countryCode}/cursos` : `/${service.getCountry().countryCode}`)}
        >
          <img src={logoUrl} alt="logo" />
        </a>
    );
  }
}

export default Logo;
