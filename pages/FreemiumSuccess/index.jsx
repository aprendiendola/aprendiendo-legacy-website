import React, { Component } from "react";
import service from "services";
import { TitleSection, CustomLink } from "components";
import { getLowestPriceFromPlans } from "utils/common";
import {
  Container,
  ImgContent,
  ContentContainer,
  Description,
  ButtonContainer,
  StyledButton,
  StyledLabel,
  DescriptionTitle,
  BenefitsGrid
} from "./styles";
import listItemIcon from "assets/images/list-item-icon.svg";

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return isMetadataObject && planSelected.metadata.is_featured === "true";
};

class Success extends Component {
  state = {
    plan: {},
    monthlyPlan: ""
  };

  componentDidMount() {
    this.loadPlans();
  }

  loadPlans = async () => {
    try {
      const response = await service.getPlans();
      const activePlans = response.data
        .filter(e => e.active)
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }))
        .slice(0, 3);
      const featuredPlan = activePlans.find(plan => plan.isFeatured);

      this.setState({
        plan: featuredPlan,
        monthlyPlan: Number(featuredPlan.metadata.monthly_price) / 100
      });
    } catch (err) {
      return err;
    }
  };

  render() {
    const { monthlyPlan } = this.state;
    return (
      <Container>
        <ImgContent />
        <ContentContainer>
          <TitleSection
            title="Gracias por suscribirte"
            fontSizeMobile="33px"
            extraTitle
            centerOnMobile
            centerOnTablet
          />
          <Description>
            Recuerda que puedes mejorar tu plan y obtener todos los beneficios
            desde <strong>S/{monthlyPlan} al mes.</strong>
          </Description>
          <ButtonContainer>
            <CustomLink path="/suscripcion">
              <StyledButton isHighlight>
                <StyledLabel isClickable isHighlight>
                  Mejora tu plan
                </StyledLabel>
              </StyledButton>
            </CustomLink>
            <CustomLink path="/cursos">
              <StyledButton>
                <StyledLabel isClickable>Ir a mis cursos</StyledLabel>
              </StyledButton>
            </CustomLink>
          </ButtonContainer>
          <DescriptionTitle>Mejora tu plan y obtén:</DescriptionTitle>
          <BenefitsGrid>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Acceso ilimitado.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Videos diarios ilimitados.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Soporte al cliente.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Sin anuncios.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Contacto con el profesor.</div>
            </div>
          </BenefitsGrid>
        </ContentContainer>
      </Container>
    );
  }
}

export default Success;
