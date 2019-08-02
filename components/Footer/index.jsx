import React, { Component, Fragment } from "react";
import { TitleSection, Label, CustomLink } from "components";
import moment from "moment";
import facebookPixel from "utils/facebook";
import masterCard from "assets/images/masterCard.svg";
import peruFlag from "assets/images/icons/peruFlag.png";
import chileFlag from "assets/images/icons/chileFlag.png";
import payCard from "assets/images/payCard.svg";
import visaCard from "assets/images/visaCard.svg";
import whatsappLogo from "assets/images/whatsappLogo.svg";
import yapeCard from "assets/images/yapeCard.svg";
import bcpCard from "assets/images/bcpCard.svg";
import instaLogo from "assets/images/instaLogo.svg";
import faceLogo from "assets/images/faceLogo.svg";
import { CONTACT_NUMBER } from "constants";
import {
  Div,
  NewFooterContainer,
  FooterLogo,
  PaymentOptionContainer,
  NewCopyRightContainer,
  Container,
  Dash,
  FooterImgContainer,
  FooterImg,
  ImgContainer,
  FooterContentContainer,
  FooterContent,
  SocialContainer,
  Social,
  MainFooterContainer,
  HyperLink
} from "./styles";

class Footer extends Component {
  state = {
    countrySelected: "PE"
  };

  componentDidMount() {
    const country = localStorage.getItem("country_code");
    if (country) {
      this.setState({ countrySelected: country });
    }
  }

  changeCountry = country => {
    localStorage.setItem("country_code", country);
    facebookPixel.locationChoosed(country);
    this.setState({ countrySelected: country }, () => {
      document.location.href = "/";
    });
  };

  render() {
    const { countrySelected } = this.state;
    const { isVisible, isPlayer } = this.props;

    return (
      <Fragment>
        {!isVisible && (
          <Div>
            <NewFooterContainer>
              <MainFooterContainer>
                <FooterImgContainer>
                  <FooterImg />
                </FooterImgContainer>
                <TitleSection
                  title="Contigo cuando quieras"
                  color="#fff"
                  extraTitle
                />
              </MainFooterContainer>
              <Container>
                <FooterContentContainer>
                  <FooterContent>
                    <Label fontSize="16px" weight="black" color="#fff">
                      Descubre
                    </Label>
                    <Label fontSize="14px" color="#fff">
                      <CustomLink path="/suscripcion">
                        <a style={{ textDecoration: "none", color: "#fff" }}>
                          Vuélvete premium
                        </a>
                      </CustomLink>
                    </Label>
                    <Label fontSize="14px" color="#fff">
                      <a
                        style={{ textDecoration: "none", color: "#fff" }}
                        onClick={() => {
                          facebookPixel.becomeTeacher("Footer");
                          return window.open(
                            "https://profesores.aprendiendo.la",
                            "_blank"
                          );
                        }}
                      >
                        Conviértete en profesor
                      </a>
                    </Label>
                    <Label fontSize="14px" color="#fff">
                      <a
                        style={{ textDecoration: "none", color: "#fff" }}
                        href="https://medium.com/@aprendiendo.la"
                        target="blank"
                      >
                        Nuestro blog
                      </a>
                    </Label>
                    <Label fontSize="14px" color="#fff">
                      <CustomLink path="/condiciones-de-uso">
                        <a style={{ textDecoration: "none", color: "#fff" }}>
                          Términos y condiciones
                        </a>
                      </CustomLink>
                    </Label>
                    <Label fontSize="14px" color="#fff">
                      <CustomLink path="/politicas-de-privacidad">
                        <a style={{ textDecoration: "none", color: "#fff" }}>
                          Política de privacidad
                        </a>
                      </CustomLink>
                    </Label>
                  </FooterContent>
                  <FooterContent>
                    <Label fontSize="16px" weight="black" color="#fff">
                      Síguenos
                    </Label>
                    <SocialContainer>
                      <a
                        href="https://www.facebook.com/aprendiendola/"
                        style={{
                          color: "#fff",
                          pointer: "cursor",
                          marginRight: "25px"
                        }}
                        target="blank"
                      >
                        <Social image={faceLogo} size="10px" />
                      </a>
                      <a
                        href="https://www.instagram.com/aprendiendo.la/"
                        style={{ color: "#fff", pointer: "cursor" }}
                        target="blank"
                      >
                        <Social image={instaLogo} size="20px" />
                      </a>
                    </SocialContainer>
                    <Label fontSize="16px" weight="black" color="#fff">
                      ¿Tienes dudas?
                    </Label>
                    <SocialContainer>
                      <CustomLink path="/preguntas-frecuentes">
                        <a href="#!" style={{ color: "#fff", fontWeight: 600 }}>
                          Preguntas frecuentes
                        </a>
                      </CustomLink>
                    </SocialContainer>
                  </FooterContent>
                </FooterContentContainer>
              </Container>
            </NewFooterContainer>
            <ImgContainer>
              <FooterImg />
            </ImgContainer>
          </Div>
        )}

        {!isPlayer && (
          <div>
            <NewCopyRightContainer>
              <PaymentOptionContainer>
                <FooterLogo img={masterCard} marginRight="15px" />
                <FooterLogo img={visaCard} marginRight="15px" />
              </PaymentOptionContainer>
              <Dash />
              <Label weight="bold" color="#626262">
                {`© ${moment().format("YYYY")} Aprendiendo.la`}
              </Label>
            </NewCopyRightContainer>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Footer;
