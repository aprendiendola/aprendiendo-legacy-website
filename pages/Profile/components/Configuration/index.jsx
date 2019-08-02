import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import Swal from 'sweetalert2';
import { ErrorModal } from 'components';
import service from 'services';
import { PageContainer, SectionTitle, SubscriptionSection, SectionSubtitle } from './styles';
import UpdatePasswordForm from './components/UpdatePasswordForm';

class Configuration extends Component {
  state = {
    errorModalActive: false
  };

  closeErrorModal = () => {
    const { errorModalActive } = this.state;

    this.setState({
      errorModalActive: !errorModalActive
    });
  };

  handleUpdatePasswordSubmit = async values => {
    const { token } = this.props;

    const response = await service.updatePassword(token, values);

    if (!response.status) {
      ReactGA.ga('send', 'pageview', '/virtual/profile/update-password');
      Swal.fire({
        title: 'Has cambiado tu contraseña',
        type: 'success',
        showCloseButton: true
      });
    } else if (response.status === 500) {
      this.setState({
        errorModalActive: true
      });
    }
    return response.status;
  };

  render() {
    const { errorModalActive } = this.state;

    return (
      <Fragment>
        <PageContainer>
          <SectionTitle>Configuración</SectionTitle>
          <SubscriptionSection>
            <SectionSubtitle>Cambiar contraseña</SectionSubtitle>
            <hr
              style={{
                borderTop: '1px solid #eee',
                bottom: '8px',
                position: 'relative',
                maxWidth: '760px',
                margin: '14px 0px'
              }}
            />
            <p>Cambiar tu contraseña es muy simple.</p>
            <UpdatePasswordForm onSubmit={this.handleUpdatePasswordSubmit} />
          </SubscriptionSection>
          <ErrorModal
            active={errorModalActive}
            closeModal={this.closeErrorModal}
            title="Algo salió mal..."
            subtitle="Ocurrió un error inesperado"
            info="Si no se resuelve, intente de nuevo más tarde o comuníquese con nosotros"
          />
        </PageContainer>
      </Fragment>
    );
  }
}

export default Configuration;
