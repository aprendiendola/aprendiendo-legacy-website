import React from "react";
import { CustomLink } from "components";
import Button from "components/Button";
import successImg from "assets/images/pet-buy-successfully.svg";
import "./styles.scss";

const Success = () => (
  <div className="success-wrapper">
    <div className="success-heading">
      <h1 className="heading-title">{"Gracias por tu Compra"} </h1>
      <p className="heading-subtitle">Tu pago se realizó con éxito</p>
    </div>
    <div className="success-content">
      <img src={successImg} alt="éxito" className="success-logo" />
      <div className="success-message">
        ¡Ya puedes ver tus clases! Disfruta la experiencia.
      </div>
      <div className="button-wrapper">
        <CustomLink path="/perfil">
          <Button>Mira tus cursos</Button>
        </CustomLink>
      </div>
    </div>
  </div>
);

export default Success;
