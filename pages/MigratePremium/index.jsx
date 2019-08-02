import React, { Component, Fragment } from 'react';
import { TitleSection, Button, Label, Alert, CustomLink } from 'components';
import service from 'services';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Router } from 'routes';
import facebookPixel from 'utils/facebook';
import { ErrorModal } from 'components';
import loading from 'assets/images/loading.gif';
import { updateUser } from 'reducers/auth';
import {
  Container,
  CardContainer,
  Text,
  CoursesContainer,
  LiContainer,
  Check,
  Badge,
  ShapeRight,
  JetKid,
  Loading,
} from './styles';
import { updateRoute } from 'reducers/history';

const { pushRoute } = Router;
const SUBSCRIBED = 'subscribed';

class MigratePremium extends Component {
  state = {
    courses: [],
    billingInfo: [],
    isLoading: false,
    errorModalActive: false,
    showView: false,
  };

  async componentDidMount() {
    const {
      user, token, router, setRoute
    } = this.props;

    setRoute(router.asPath);

    if (!token) {
      pushRoute(`/${service.getCountry().countryCode}/login`);
      return;
    }

    if (user && user.access_type === SUBSCRIBED) {
      pushRoute(`/${service.getCountry().countryCode}/cursos`);
      return;
    }

    this.setState({ showView: true });

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const { data: courses } = await service.getCourses(1, user.university_id, null, null, null, token, 50);

    const { data: billingInfo } = await service.getMyBillingInfo(token);

    this.setState({ courses, billingInfo });
  }

  async migrateToSubscription() {
    this.setState({ isLoading: true });

    const { user, token, updateUserData } = this.props;

    const response = await service.migrate(token);


    if (response.status) {
      this.setState({ isLoading: false });
      this.toggleErrorModal();
    } else {
      user.access_type = 'subscribed';

      updateUserData(token, user);

      pushRoute(`/${service.getCountry().countryCode}/perfil`);
    }
  }

  toggleErrorModal = () => {
    const { errorModalActive } = this.state;

    this.setState({
      errorModalActive: !errorModalActive
    });
  };

  render() {
    const {
      courses, isLoading, errorModalActive, billingInfo, showView
    } = this.state;

    return !showView ? (<Loading src={loading} alt="loading gif" />) : (
      <div style={{ position: 'relative' }}>
        <ErrorModal
          active={errorModalActive}
          closeModal={this.toggleErrorModal}
          title="Algo salió mal..."
          subtitle="Ocurrió un error al intentar migrar tu cuenta"
          info="Si no se resuelve, intente de nuevo más tarde o comuníquese con nosotros"
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '844px',
            margin: 'auto',
            position: 'relative'
          }}
        >
          <Alert style={{ justifyContent: 'space-between', maxWidth: '768px', margin: '33px auto 0' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Tu compra se completó con éxito
            </Text>
            <CustomLink path="/perfil">
              <Button
                style={{
                  backgroundColor: '#ffffff00',
                  border: '1px solid #fff',
                  color: '#fff',
                  minWidth: '150px',
                  padding: '10px 30px',
                  boxShadow: 'none'
                }}
              >
                Ir a mis clases
              </Button>
            </CustomLink>
          </Alert>
          <Container>
            <CardContainer>
              <TitleSection
                title="Vuélvete Premium"
              />
              <Text>
                Accede a todos los cursos de tu universidad por un pago mensual de S/99.
              </Text>
              <Text>
                Puedes congelar tu plan al terminar el ciclo de verano y guardar los días que te quedan para el 2019-1.
              </Text>
              <Text>
                Dale al botón <strong>Vuélvete Premium</strong> y haremos el cambio automáticamente y <strong>sin costo adicional.</strong>
              </Text>
              <Button
                onClick={() => {
                  facebookPixel.migrate();
                  if (billingInfo.length > 0) {
                      this.migrateToSubscription();
                  } else {
                    pushRoute(`/${service.getCountry().countryCode}/premium/checkout/1?migrate=true`);
                  }
                }}
                disabled={isLoading}
                style={{ marginTop: '10px' }}
              >
                <Label color="#fff" weight="black" fontSize="20px" isClickable={!isLoading}>
                  {isLoading ? 'Cargando' : 'Sí, quiero ser Premium'}
                </Label>
              </Button>
            </CardContainer>
            <CoursesContainer>
              <Text style={{ marginBottom: '22px' }}>
                ¡Hey! Mira todos los cursos que puedes llevar si migras al <strong>Plan Premium</strong>:
              </Text>

              {courses && courses.map(({ name, release_text: releaseText }) => (
                <LiContainer>
                  <Check />
                  <Text>
                    {name}
                  </Text>
                  {releaseText && (
                  <Badge>
                    {releaseText}
                  </Badge>)}
                </LiContainer>
                ))}
            </CoursesContainer>
          </Container>
        </div>
        <ShapeRight size="500px">
          <JetKid />
        </ShapeRight>
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  token: auth.token
});

const mapDispatchToProps = {
  updateUserData: (token, user) => updateUser(token, user),
  setRoute: route => updateRoute(route)
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MigratePremium));
