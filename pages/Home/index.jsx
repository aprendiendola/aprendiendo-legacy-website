import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import loop from "assets/images/loop-icon.svg";
import trophy from "assets/images/trophy-icon.svg";
import student from "assets/images/Blanquito.svg";
import material from "assets/images/download-material-icon.svg";
import service from "services";
import { setCouponCode } from "reducers/coupons";
import { getUrlParams } from "utils/common";
import {
  Main,
  Learn,
  ChooseUniversity,
  Feedback,
  Award,
  BecomeTeacher,
  Contact,
  Referrals
} from "components";

class Home extends Component {
  state = {
    universities: []
  };

  async componentDidMount() {
    const { data } = await service.getUniversities("stats");
    this.setState({ universities: data });

    const { router, setDiscountCoupon } = this.props;

    const {
      ref_coupon: discountCoupon,
      utm_source: utmSource,
      utm_medium: utmMedium
    } = getUrlParams(router.asPath);

    if (discountCoupon) {
      setDiscountCoupon({
        code: discountCoupon,
        source: utmSource || "direct",
        medium: utmMedium
      });
    }
  }

  render() {
    const { token } = this.props;
    const { universities } = this.state;
    return (
      <Fragment>
        <Main />
        <Learn
          title="¡Aprende con nosotros!"
          text="Clases sin floro. Con profesores que han pasado por lo mismo que tú y saben lo que necesitas para que la rompas en tus examenes."
          icon1={{
            iconImg: student,
            iconTitle: "Aprende a tu ritmo",
            iconSubtitle: "Mira tus clases todas las veces que necesites."
          }}
          icon2={{
            iconImg: loop,
            iconTitle: "Siempre disponible",
            iconSubtitle: "Mira tus clases cuando quieras y donde quieras."
          }}
          icon3={{
            iconImg: material,
            iconTitle: "Materiales para descargar",
            iconSubtitle: "Materiales de apoyo disponibles en tus clases."
          }}
          icon4={{
            iconImg: trophy,
            iconTitle: "Los mejores profesores",
            iconSubtitle: "Dominan los cursos y enseñan chévere."
          }}
        />
        <ChooseUniversity universities={universities} />
        <Referrals loggedIn={token !== undefined && token !== null} />
        <Feedback />
        <Award />
        <BecomeTeacher />
        <Contact
          title="¿Tienes dudas?"
          paragraph1="Mira nuestra sección de"
          paragraph2="preguntas frecuentes."
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
    user: auth.user
  };
};

const mapDispatchToProps = {
  setDiscountCoupon: coupon => setCouponCode(coupon)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
