import React, { Fragment } from "react";
import facebookPixel from "utils/facebook";
import { TitleSection, Label, Button } from "components";
import { CONTACT_NUMBER } from "constants";
import { Section, ContactContainer } from "./styles";

const Contact = ({
  title,
  paragraph1,
  paragraph2,
  withNoPadding,
  paddingTop
}) => {
  return (
    <ContactContainer>
      <Section withNoPadding={withNoPadding} paddingTop={paddingTop}>
        <TitleSection
          title={title || "¿Qué te gustaría encontrar en nuestra página?"}
        />
        <Label fontSize="16px" color="#626262" textAlign="center" margin="auto">
          {paragraph1 || "Déjanos un comentario. Tus ideas son súper"}
        </Label>
        <Label
          fontSize="16px"
          color="#626262"
          textAlign="center"
          margin="0 auto 30px"
        >
          {paragraph2 || "importantes para nosotros."}
        </Label>
      </Section>
      <a
        style={{ color: "#fff" }}
        href={"https://premium.aprendiendo.la/pe/preguntas-frecuentes"}
        target="blank"
      >
        <Button
          style={{ margin: "0 auto 50px" }}
          onClick={() => {
            facebookPixel.leaveComment();
            // Tawk_API.maximize();
          }}
        >
          <Label color="#fff" weight="black" fontSize="20px" isClickable>
            Preguntas frecuentes
          </Label>
        </Button>
      </a>
    </ContactContainer>
  );
};

export default Contact;
