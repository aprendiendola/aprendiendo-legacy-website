/* eslint import/no-unresolved: 0 camelcase: 0 */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Contact, Feedback } from 'components';
import facebookPixel from 'utils/facebook';
import { withRouter } from 'next/router';
import { avoidUrlParams } from 'utils/common';
import ClassesModal from 'components/ClassesModal';
import service from 'services';
import Vimeo from '@vimeo/player';
import Modal from 'components/Modal';
import Banner from 'components/OfferBanner';
import { setCouponCode, validateCouponCode } from 'reducers/coupons';
import { getUrlParams } from 'utils/common';
import loadingSvg from 'static/images/loading.svg';
import Heading from './Heading';
import Plans from './Plans';
import './styles.scss';
import { LeftShape, RightShape } from './styles';

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return isMetadataObject && planSelected.metadata.is_featured === 'true';
};

class Packages extends PureComponent {
  state = {
    course: {
      name: '',
      university: ''
    },
    packages: [],
    plans: [],
    modalActive: false,
    packageId: null,
    showHelperVideoModal: false,
    courseId: '',
    tabPlanSelected: ''
  };

  componentDidMount() {
    const { router, setDiscountCoupon, isValidCouponCode, token } = this.props;

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
    this.setState({ courseId }, () => {
      this.loadCourse(courseId);
      this.loadPlans();
    });
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
    try {
      const response = await service.getPlans();
      const activePlans = response.data
        .filter(e => e.active)
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }))
        .slice(0, 3);

      const featuredPlan = activePlans.find(e => e.isFeatured);

      this.setState({ plans: activePlans, tabPlanSelected: featuredPlan.id });
    } catch (err) {
      return err;
    }
  };

  toggleModal = id => {
    const { modalActive } = this.state;
    this.setState({
      modalActive: !modalActive,
      packageId: modalActive ? null : id
    });
  };

  addShoppingCart = async product => {
    const {
      course: { university, name }
    } = this.state;

    const { addCart, loadCartContent } = this.props;

    const newProduct = {
      name,
      id: product.id,
      package: product.name,
      price: product.price,
      university: university.data.name,
      type: 'packages'
    };

    await addCart(newProduct);
    await loadCartContent();
  };

  toggleHelperModal() {
    const { showHelperVideoModal } = this.state;

    const player = new Vimeo(this.player);

    if (!showHelperVideoModal) {
      player.play();
    } else {
      player.pause();
    }

    this.setState({ showHelperVideoModal: !showHelperVideoModal });
  }

  handlerTabPlan = id => {
    this.setState({ tabPlanSelected: id });
  };

  showPlans = () => {
    const { plans, tabPlanSelected } = this.state;

    return plans.length > 0 ? (
      <Fragment>
        <Plans plans={plans} onTabPlanClick={this.handlerTabPlan} tabPlanSelected={tabPlanSelected} />
      </Fragment>
    ) : (
      <div style={{ textAlign: 'center', padding: '100px 0px' }}>
        <img src={loadingSvg} alt="loading" />
      </div>
    );
  };

  render() {
    const {
      course, modalActive, packageId, showHelperVideoModal
    } = this.state;
    const { name, university } = course;

    const classesModalProps = {
      packageId,
      active: modalActive,
      closeModal: this.toggleModal
    };

    return (
      <Fragment>
        <Banner />
        <div className="packages-container">
          <div className="packages-wrapper">
            <LeftShape />
            <Heading
              course={name}
              university={university}
              toggleHelperModal={() => this.toggleHelperModal()}
            />
            {this.showPlans()}
            <RightShape />
          </div>
          <ClassesModal {...classesModalProps} />
          <Modal
            active={showHelperVideoModal}
            extraLarge
            hideClose={false}
            handleClose={() => this.toggleHelperModal()}
          >
            <div style={{ padding: '49.58% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/294718419?color=0FA3F4&title=0&byline=0&portrait=0"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%'
                }}
                id="howToBuy"
                frameBorder="0"
                webkitallowfullscreen
                title="HowToBuy"
                mozallowfullscreen
                allowFullScreen
                ref={player => {
                  this.player = player;
                }}
              />
            </div>
          </Modal>
          <Contact
            title="¿Tienes alguna pregunta?"
            paragraph1="No te quedes con la duda,"
            paddingTop="82px"
            paragraph2="te responderemos con gusto."
          />
          <Feedback />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ checkout }) => ({
  items: checkout.items
});

const mapDispatchToProps = {
  setDiscountCoupon: coupon => setCouponCode(coupon),
  isValidCouponCode: (couponCode, token) => validateCouponCode(couponCode, token)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Packages));
