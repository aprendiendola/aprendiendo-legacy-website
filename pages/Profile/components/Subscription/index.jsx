import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TitleSection, Label, Button, Alert } from 'components';
import ReactGA from 'react-ga';
import { CustomLink, ErrorModal } from 'components';
import service from 'services';
import moment from 'moment';
import { PageContainer, SectionTitle, SectionSubtitle, SubscriptionSection } from './styles';
import listItemIcon from 'assets/images/list-item-icon.svg';
import SubscribedUserSection from './components/SubscribedUserSection';
import SubscriptionFreezed from './components/SubscriptionFreezed';
import FreezeModal from './components/FreezeModal';
import FreemiumAlert from './components/FreemiumAlert';
import { CancelSubscriptionContainer, UnsubscribeButton } from '../Configuration/styles';
import CancelModal from '../Configuration/components/CancelModal';
import { setUser } from 'reducers/auth';
import { setUserEnrollments } from 'reducers/courses';

moment.locale('es');

class Subscription extends Component {
  state = {
    billingInfo: null,
    subscription: null,
    modalActive: false,
    errorModalActive: false,
    loading: false,
    justUnfreezed: false,
    cancelModalActive: false,
    showChurnReasons: false,
    cancelFormData: {
      selectedReason: [],
      otherText: ''
    }
  };

  async componentDidMount() {
    const { token, user } = this.props;

    const isSubscribed = user.access_type === 'subscribed';
    const isFreezed = user.access_type === 'freezed';

    if (isSubscribed || isFreezed) {
      try {
        const { data } = await service.getMyBillingInfo(token);
        const response = await service.getMySubscription(token);

        if (response.status && response.status >= 400) {
          this.setState({ billingInfo: data[0], subscription: null });
        }

        this.setState({ billingInfo: data[0], subscription: response[0] });
      } catch (err) {
        console.log(err);
      }
    }
  }

  toggleModal = () => {
    const { modalActive } = this.state;

    this.setState({
      modalActive: !modalActive
    });
  };

  toggleCancelModal = () => {
    const { cancelModalActive } = this.state;

    this.setState({
      cancelModalActive: !cancelModalActive
    });
  };

  closeErrorModal = () => {
    const { errorModalActive } = this.state;

    this.setState({
      errorModalActive: !errorModalActive
    });
  };

  unfreeze = async () => {
    const {
      token, user, setUserToState, setUserEnrollmentsToState
    } = this.props;
    this.setState({
      loading: true
    });

    const response = await service.unfreeze(token);

    if (response.status === 500) {
      this.setState({
        errorModalActive: true
      });
    } else {
      const data = await service.getUserAccess(token);

      setUserEnrollmentsToState(data);
      setUserToState(Object.assign({}, user, { access_type: 'subscribed' }));

      this.setState({
        justUnfreezed: true
      });
    }

    this.setState({
      loading: false
    });
  };

  freeze = async () => {
    const {
      token, user, setUserToState, setUserEnrollmentsToState
    } = this.props;

    this.setState({
      loading: true
    });

    const response = await service.freeze(token);

    if (response.status === 500) {
      this.setState({
        errorModalActive: true
      });
    } else if (response.status === 403) {
      this.setState({
        errorModalActive: true
      });
    } else {
      const data = await service.getUserAccess(token);

      setUserEnrollmentsToState(data);
      setUserToState(Object.assign({}, user, { access_type: 'freezed' }));
      this.setState({
        subscription: response
      });
    }

    this.setState({
      modalActive: false,
      loading: false
    });
  };

  unsubscribe = async churnReasons => {
    const {
      user, token, setUserEnrollmentsToState, setUserToState, setSelectedSection
    } = this.props;
    const { subscription } = this.state;

    this.setState({
      loading: true
    });

    const response = await service.unsubscribe(token, subscription.id, churnReasons);

    if (response.status === 500) {
      this.setState({
        errorModalActive: true
      });
    } else {
      const data = await service.getUserAccess(token);

      setUserEnrollmentsToState(data);
      setUserToState(Object.assign({}, user, { access_type: 'freemium' }));

      ReactGA.ga('send', 'pageview', '/virtual/profile/unsubscribe');

      setSelectedSection('cursos');
    }

    this.setState({
      cancelModalActive: false,
      loading: false
    });
  };

  handleCancelModal = () => {
    this.setState({
      showChurnReasons: true
    })
  }

  handleAgreeModal = async () => {
    const { cancelFormData } = this.state;

    const data = {};

    if (cancelFormData.otherText) {
      data.other_text = cancelFormData.otherText
    } else {
      data.selected_reason = Array.isArray(cancelFormData.selectedReason)
        ? 'no_reason' : cancelFormData.selectedReason;
    }

    await this.unsubscribe({
      churn_reasons: data,
    });

    this.setState({
      cancelModalActive: false
    });
  }

  handleReasonChange = e => {
    this.setState({
      cancelFormData: Object.assign({}, this.state.cancelFormData, { selectedReason: e })
    })
  }

  handleOtherTextChange = e => {
    this.setState({
      cancelFormData: Object.assign({}, this.state.cancelFormData, { otherText: e })
    })
  }

  render() {
    const { user } = this.props;
    const {
      billingInfo,
      subscription,
      modalActive,
      errorModalActive,
      loading,
      justUnfreezed,
      cancelModalActive,
      showChurnReasons,
      cancelFormData
    } = this.state;

    const hasCancellation =
      subscription &&
      (subscription.cancellation_date !== undefined && subscription.cancellation_date !== null);

    return (
      <Fragment>
        <PageContainer>
          <SectionTitle style={{ marginLeft: '0px', marginBottom: '15px' }}>Suscripción</SectionTitle>
          {subscription && user.access_type === 'freezed' && !hasCancellation && (
            <SubscriptionFreezed
              unfreezeDate={moment(subscription.freeze_date)
                .add(1, 'M')
                .format('LL')}
              handleUnfreeze={this.unfreeze}
              loading={loading}
            />
          )}
          {(user.access_type === 'subscribed' || user.access_type !== 'freezed') && !hasCancellation && (
            <SubscribedUserSection
              billingInfo={billingInfo}
              subscription={subscription}
              toggleModal={() => this.toggleModal()}
              hasCancellation={hasCancellation}
              justUnfreezed={justUnfreezed}
            />
          )}
          {(user.access_type === 'freemium' ||
            user.access_type === 'enrolled' ||
            user.access_type === 'none' ||
            hasCancellation) && (
            <div>
              <FreemiumAlert />
              <TitleSection title="Obtenlo todo" extraTitle style={{ maxWidth: '395px' }} />
              <Label fontSize="14px" color="#626262" textAlign="right" marginLeft="auto" marginBottom="20px">
                <div>
                  <p>
                    {hasCancellation ? (
                      `Tu suscripción ha sido cancelada, pero aún tienes acceso a tus cursos hasta el ${moment(
                        subscription.next_payment_date,
                        'DD-MM-YYYY'
                      ).format('LL')}`
                    ) : (
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ marginBottom: 15, fontWeight: 600 }}>Mejora de plan y obtén:</p>
                        <div style={{ display: 'flex', marginBottom: 10 }}>
                          <div style={{ marginRight: 10 }}>
                            <img alt="video icon" src={listItemIcon} />
                          </div>
                          Acceso Ilimitado
                        </div>
                        <div style={{ display: 'flex', marginBottom: 10 }}>
                          <div style={{ marginRight: 10 }}>
                            <img alt="video icon" src={listItemIcon} />
                          </div>
                          Quizzes con resultados
                        </div>
                        <div style={{ display: 'flex', marginBottom: 10 }}>
                          <div style={{ marginRight: 10 }}>
                            <img alt="video icon" src={listItemIcon} />
                          </div>
                          Preguntas al profesor
                        </div>
                        <div style={{ display: 'flex', marginBottom: 10 }}>
                          <div style={{ marginRight: 10 }}>
                            <img alt="book icon" src={listItemIcon} />
                          </div>
                          Soporte al Cliente
                        </div>
                        <div style={{ display: 'flex', marginBottom: 10 }}>
                          <div style={{ marginRight: 10 }}>
                            <img alt="download icon" src={listItemIcon} />
                          </div>
                          Sin interrupciones por anuncios
                        </div>
                      </div>
                    )}
                  </p>
                  <br />
                </div>
              </Label>
            </div>
          )}

          {subscription && (user.access_type === 'subscribed' || user.access_type !== 'freezed') && (
            <Fragment>
              <SubscriptionSection>
                {!hasCancellation && (
                  <CancelSubscriptionContainer>
                    <SectionSubtitle style={{ marginBottom: '10px', color: '#000' }}>
                      Cancelar suscripción
                    </SectionSubtitle>
                    <div>
                      <p>
                        Si deseas cancelar tu suscripción, esta se hará efectiva al finalizar tu periodo
                        actual de facturación:{' '}
                        <p>
                          <strong>{subscription.next_payment_date}</strong>
                        </p>
                      </p>
                      <UnsubscribeButton onClick={() => this.toggleCancelModal()}>Cancelar</UnsubscribeButton>
                    </div>
                  </CancelSubscriptionContainer>
                )}
              </SubscriptionSection>
            </Fragment>
          )}

          <CancelModal
            user={user}
            onAgree={this.handleCancelModal}
            modalActive={cancelModalActive}
            toggleModal={this.toggleCancelModal}
            loading={loading}
            showChurnReasons={showChurnReasons}
            cancelFormData={cancelFormData}
            onReasonChange={this.handleReasonChange}
            onOtherTextChange={this.handleOtherTextChange}
            onUnsuscribe={this.handleAgreeModal}
          />

          <FreezeModal
            modalActive={modalActive}
            toggleModal={this.toggleModal}
            freeze={this.freeze}
            loading={loading}
            freezeDate={moment()
              .add(1, 'M')
              .format('LL')}
          />

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

const mapDispatchToProps = {
  setUserToState: user => setUser(user),
  setUserEnrollmentsToState: data => setUserEnrollments(data)
};

export default connect(
  null,
  mapDispatchToProps
)(Subscription);
