import React, { Component } from 'react';
import Router from 'next/router';
import HeaderAvatar from 'components/HeaderAvatar';
import { LargeButton } from 'components';
import service from 'services';
import headerSvg from "assets/images/header_bg.svg";
import closeImg from "assets/images/close_white.svg";

import './styles.scss';

class Sidenav extends Component {
  static defaultProps = {
    user: null
  };

  handleClick = () => {
    this.props.onCloseSideNav();
  };

  signInOptions = [
    { url: '/perfil', tag: 'Mis cursos' },
    { url: 'https://profesores.aprendiendo.la', tag: 'Conviértete en profesor', is_external: true },
    {
      url: '#',
      handleClick: () => {
        this.logout();
      },
      tag: 'Cerrar sesión'
    }
  ];

  changeRoute = route => {
    Router.push(`/${service.getCountry().countryCode}/${route}`);
  }
  
  renderActionButtons = () => {
    return (
      <div style={{ padding: '30px 10px' }}>
        <LargeButton
            large
            handleClick={() => this.changeRoute('suscripcion#precios')}
            style={{
              width: '100%',
              margin: '10px 0px',
              height: 42,
              fontSize: '16px',
              background: '#87e400'
          }}>
            Aplicar filtros
          </LargeButton>
      </div>
    )
  }

  renderMenu = user => {
    return (<div>
      {user ? (
        <div
          style={{ padding: 10 }}
          onClick={() => this.changeRoute('perfil')}>
          Mi Perfil
        </div>) : (
        <div
          style={{ padding: 10 }}
          onClick={() => this.changeRoute('suscripcion#precios')}>
          Ver planes
        </div>
        )
      }
    </div>);
  }

  render() {
    const { isOpenSidenav, user, onCloseSideNav } = this.props;

    return (
      <div className={`sidenav-wrapper-general ${isOpenSidenav ? 'active-sidenav' : ''}`}>
        <div className="container-sidenav">
          <div>
            <div style={{
              fontWeight: 900,
              color: '#fff',
              backgroundImage: `url(${headerSvg})`,
              backgroundSize: 'cover',
              padding: 15
            }}>
              <div style={{ textAlign: "right" }} onClick={() => onCloseSideNav()}>
                <img style={{ height: 14 }} src={closeImg} alt="close" />
              </div>
                {user ? (
                  <section style={{
                    padding: 10,
                    display: 'grid',
                    gridTemplateColumns: '60px auto',
                    alignItems: 'center',
                    gridColumnGap: 8,
                    fontSize: '16px'
                  }}>
                    <HeaderAvatar
                      name={`${user.name} ${user.last_name}`}
                      icon={user.avatar}
                      size={55}
                    />
                    <div>
                      <p style={{ fontWeight: 900 }}>
                        {`${user.name} `}
                        {user.last_name}
                      </p>
                      <span style={{ fontWeight: 400 }}>
                        {user.university_name}
                      </span>
                    </div>
                  </section>
                ) : (
                  <div style={{ width: 185 }}>
                    <h1 style={{ fontWeight: 900, fontSize: 16 }}>Cursos online de refuerzo universitario</h1>
                  </div>
                )}
            </div>
            <div style={{
              padding: 15,
              color: '#414042'
            }}>
              <div style={{ padding: 10 }} onClick={() => this.changeRoute('cursos')}>
                Mira los cursos
              </div>
              {this.renderMenu(user)}
              <div style={{ padding: 10 }}>
                <a href="https://profesores.aprendiendo.la/" target="_blank" style={{ color: '#414042' }}>
                  Enseña con nosotros
                </a>
              </div>
              <div
                style={{ padding: 10, color: '#1178f2', fontWeight: 900 }}
                onClick={() => this.changeRoute(user ? 'perfil?referrals=true' : 'login')}
              >
                Gana S/20 a más
              </div>
              {
                user && (
                  <section
                    style={{ padding: '0px 10px', marginTop: 70 }}
                    onClick={() => this.changeRoute('login')}
                  >
                    Cerrar sesión
                  </section>
                )
              }
              {this.renderActionButtons(user)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidenav
