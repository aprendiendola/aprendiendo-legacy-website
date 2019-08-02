/* eslint import/no-unresolved: 0 camelcase: 0 */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Contact, SubscriptionPlans, CourseFlatList } from 'components';
import facebookPixel from 'utils/facebook';
import { withRouter } from 'next/router';
import { avoidUrlParams, isExperimentRunning } from 'utils/common';
import service from 'services';
import Banner from 'components/OfferBanner';
import { setCouponCode, validateCouponCode } from 'reducers/coupons';
import { getUrlParams } from 'utils/common';
import loadingSvg from 'static/images/loading.svg';
import Heading from './Heading';
import Plans from './Plans';
import './styles.scss';

const UNIVERSITY_PUPC_ID = 8;

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return (
    isMetadataObject &&
    planSelected.metadata &&
    planSelected.metadata.is_featured === "true"
  );
};

const isPackage = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return (
    isMetadataObject &&
    planSelected.metadata &&
    planSelected.metadata.is_package === "true"
  );
};

const isPUPC = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return (
    isMetadataObject &&
    planSelected.metadata &&
    parseInt(planSelected.metadata.university_id) === 8
  );
};

const sortByOrder = (x, y) => {
  const xIsMetadataObject = !Array.isArray(x.metadata);
  const yIsMetadataObject = !Array.isArray(y.metadata);

  if (xIsMetadataObject && x.metadata && yIsMetadataObject && y.metadata) {
    return Number(x.metadata.order) - Number(y.metadata.order);
  }
  return 0;
};

class PlansPage extends PureComponent {
  state = {
    course: {
      name: '',
      university: ''
    },
    plans: [],
    tabPlanSelected: ''
  };

  componentDidMount() {
    const {
      router, setDiscountCoupon, isValidCouponCode, token
    } = this.props;

    const { ref_coupon: discountCoupon, utm_source: utmSource, utm_medium: utmMedium } = getUrlParams(
      router.asPath
    );

    if (discountCoupon) {
      setDiscountCoupon({ code: discountCoupon, source: utmSource || 'direct', medium: utmMedium });
      if (token) {
        isValidCouponCode(discountCoupon, token);
      }
    }

    window.scrollTo(0, 0);
    const courseId = avoidUrlParams(router.asPath);
    this.loadCourse(courseId);
    this.loadPlans();
  }

  handleLoad() {
    if (typeof window !== 'undefined' && typeof window.google_optimize !== 'undefined') {
      const variant = parseInt(window.google_optimize.get(process.env.EXPERIMENT_ID));
      this.setState({ isExperimental: Boolean(variant) });
    }
  }

  loadCourse = async id => {
    try {
      const { token } = this.props;
      const response = await service.getCourse(id, token);

      this.setState({ course: response.data });
    } catch (err) {
      return err;
    }
  };

  loadPlans = async () => {
    const isExperiment = await isExperimentRunning();
    try {
      const response = await service.getInhousePlans();
      const activePlans = this.plansFilter(response.data);
      let sortedPlans = activePlans.sort((a, b) => sortByOrder(a, b));

      if (isExperiment) {
        sortedPlans = sortedPlans.filter(
          e =>
            (e.metadata && e.metadata.is_experiment === "true") ||
            (e.metadata &&
              e.metadata.is_experiment === "true" &&
              e.provider_name === "aprendiendo") ||
            e.provider_name === "aprendiendo"
        );
      } else {
        sortedPlans = sortedPlans.filter(
          e => e.metadata && e.metadata.is_experiment !== "true"
        );
      }

      const featuredPlan = sortedPlans.find(e => isFeatured(e));

      this.setState({
        plans: sortedPlans,
        tabPlanSelected: featuredPlan.provider_id
      });
    } catch (err) {
      return err;
    }
  };

  plansFilter = plans => {
    const { user } = this.props;

    let activePlans = [];

    if (user) {
      if (user.university_id === UNIVERSITY_PUPC_ID) {
        activePlans = plans
          .filter(e => e.active === 1 && (isPUPC(e) || e.provider_name === 'aprendiendo'))
          .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));

      } else {
        activePlans = plans
          .filter(e => e.active === 1 && !isPUPC(e) && e.provider_name === 'stripe')
          .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));
      }
    } else {
      activePlans = plans
        .filter(e => {
          return e.active === 1 && (!isPUPC(e) || e.provider_name === 'aprendiendo');
        })
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));
    }

    return activePlans;
  };

  handlerTabPlan = id => {
    this.setState({ tabPlanSelected: id });
  };

  showPlans = () => {
    const {
      plans,
      tabPlanSelected,
      course: { university }
    } = this.state;
    const { user } = this.props;

    return plans.length > 0 ? (
      <Fragment>
        <SubscriptionPlans
          plans={plans}
          tabPlanSelected={tabPlanSelected}
          onTabPlanClick={this.handlerTabPlan}
          subTitle={(university && university.data.name) || (user && user.university_name)}
          weightSubTitle="black"
          accessType={user && user.access_type}
          customSubtitle={
            <p
              style={{
                fontWeight: 900,
                fontSize: '17px',
                color: '#626262',
                margin: '15px auto 45px'
              }}
            >
              Los planes incluyen todos nuestros cursos para tu universidad,
              <b
                role="presentation"
                style={{
                  color: '#0fa3f4',
                  fontWeight: '900',
                  margin: '0 5px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  document.querySelector('#courses-included').scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                  });
                }}
              >
                ver cursos.
              </b>
            </p>
          }
        />
      </Fragment>
    ) : (
      <div style={{ textAlign: 'center', padding: '100px 0px' }}>
        <img src={loadingSvg} alt="loading" />
      </div>
    );
  };

  render() {
    const {
      course: { university }
    } = this.state;
    return (
      <Fragment>
        <Banner />
        <div className="packages-container">
          <div id="precios" className="packages-wrapper">
            {this.showPlans()}
          </div>
          {university && university.data.id && (
            <CourseFlatList
              defaultSelectedUniversityId={university.data.id}
              title={
                <Fragment>
                  ¿Qué esperas para romperla en
                  <b style={{ color: '#0fa3f4', fontWeight: '900', margin: '0 5px' }}>todos tus cursos</b>?
                </Fragment>
              }
              callToActionTitle={
                <p style={{ fontWeight: 900, fontSize: '22px', color: '#626262' }}>
                  Ya lo sabes,
                  <b style={{ color: '#0fa3f4', fontWeight: '900', margin: '0 5px' }}>elige tu plan</b>y
                  comienza a aprender
                </p>
              }
              callToAction="Vuélvete Premium"
              noArrow
              noSelect
              noDash
            />
          )}
          <Contact
            title="¿Tienes alguna pregunta?"
            paragraph1="No te quedes con la duda,"
            paddingTop="82px"
            paragraph2="te responderemos con gusto."
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, checkout }) => ({
  items: checkout.items,
  user: auth.user
});

const mapDispatchToProps = {
  setDiscountCoupon: coupon => setCouponCode(coupon),
  isValidCouponCode: (couponCode, token) => validateCouponCode(couponCode, token)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PlansPage));
