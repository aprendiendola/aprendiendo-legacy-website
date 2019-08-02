import React, { Component, Fragment } from 'react';
import { TitleSection, Button, Label, Alert, CustomLink } from 'components';
import service from 'services';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Router } from 'routes';
import { setCouponCode } from 'reducers/coupons';
import { setFinalPrice } from 'reducers/checkout';
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
  BenefitList,
  Loading,
} from './styles';
import { updateRoute } from 'reducers/history';

const { pushRoute } = Router;
const SUBSCRIBED = 'subscribed';

class Presale extends Component {
  state = {
    courses: [],
    billingInfo: [],
    isLoading: false,
    errorModalActive: false,
    showView: false,
  };

  async componentDidMount() {
    const {
      router, setRoute
    } = this.props;

    setRoute(router.asPath);

    const findIndex = router.asPath.indexOf('?');
    pushRoute(`/${service.getCountry().countryCode}/suscripcion${findIndex !== -1 ? router.asPath.slice(findIndex) : ''}#pricing`);

    // // if (user && user.access_type === SUBSCRIBED) {
    // //   pushRoute(`/${service.getCountry().countryCode}/cursos`);
    // //   return;
    // // }

    // if (!token) {
    //   pushRoute(`/${service.getCountry().countryCode}/login`);
    //   return;
    // }

    // this.setState({ showView: true });

    // if (typeof window !== 'undefined') {
    //   window.scrollTo(0, 0);
    // }

    // const { data: courses } = await service.getCourses(1, user.university_id, null, null, null, token, 50);

    // const { data: billingInfo } = await service.getMyBillingInfo(token);

    // this.setState({ courses, billingInfo });
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

    const { user, storePriceToPay, setDiscountCoupon } = this.props;

    return !showView ? (<Loading src={loading} alt="loading gif" />) : (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '844px',
            margin: 'auto',
            marginTop: '53px',
            position: 'relative'
          }}
        >
          <TitleSection
            title="Vuélvete Premium"
          />
          <Container>
            <CardContainer>
              <TitleSection
                extraTitle
                style={{ fontSize: '26px', marginLeft: '8px' }}
                title="Las cosas claras"
                paddingBottom="0px"
                noDash
              />

              <Text>
                <BenefitList>
                  <li>Suscríbete ahora y tendrás acceso a todos los cursos de tu universidad.</li>
                  <li>Tu plan comenzará a correr desde el dia de inicio de tus clases.</li>
                  <li>A partir del segundo mes se te cobrará el precio regular de S/99.</li>
                  <li>Puedes cancelar o congelar tu suscripción cuando quieras.</li>
                </BenefitList>
              </Text>
              <Button
                onClick={() => {
                  pushRoute(`/${service.getCountry().countryCode}/suscripcion#pricing`);
                }}
                disabled={isLoading}
                style={{ marginTop: '10px', display: 'flex', alignSelf: 'center' }}
              >
                <Label color="#fff" weight="black" fontSize="20px" isClickable={!isLoading}>
                  Vuélvete Premium
                </Label>
              </Button>
            </CardContainer>
            <CoursesContainer>
              <Text style={{ marginBottom: '22px' }}>
                ¡Hey! Mira todos los cursos que puedes llevar si te suscribes al <strong>Plan Premium</strong>:
              </Text>

              {courses && courses.map(({ name, release_text: releaseText }) => (
                <LiContainer>
                  <Check />
                  <Text style={{ maxWidth: '210px' }}>
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
  setRoute: route => updateRoute(route),
  setDiscountCoupon: coupon => setCouponCode(coupon),
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Presale));
