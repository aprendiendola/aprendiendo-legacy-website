import React, { PureComponent } from "react";
import Router from "next/router";
import Modal from "components/Modal";
import Button from "components/Button";
import service from "services";
import { YAPE_CONTACT_NUMBER } from "constants";
import qrImage from "assets/images/qr.jpg";
import "./styles.scss";
import {
  StepContainer,
  Step,
  StepTag,
  StepText,
  QRContainer,
  QrImage,
  ButtonContainer
} from "./styles";

class YapeModal extends PureComponent {
  render() {
    const { active, closeModal, totalPrice } = this.props;

    return (
      <Modal
        active={active}
        large
        hideClose
        handleClose={closeModal}
        fullScreen
      >
        <div className="modal-content">
          <div>
            <div className="title">
              <img
                alt="close icon"
                className="icon-close"
                className="close-modal"
                onClick={closeModal}
                src="/static/images/close-icon.png"
              />

              <h2 className="checkout-payment-title">
                Total a pagar:{" "}
                <strong>
                  {service.getCountry().currencySymbol}
                  {totalPrice}
                </strong>{" "}
              </h2>

              <StepContainer>
                <Step>
                  <StepTag>Paso 1</StepTag>
                  <StepText>
                    <p>Paga la cantidad indicada al siguiente número:</p>
                    <p className="number">
                      <a
                        href={`https://wa.me/51${YAPE_CONTACT_NUMBER}`}
                        target="blank"
                      >
                        {YAPE_CONTACT_NUMBER}
                      </a>
                    </p>
                    <p>
                      O escanea el código QR de la derecha y realiza el pago.
                    </p>
                  </StepText>
                  <QRContainer>
                    <QrImage src={qrImage} />
                  </QRContainer>
                </Step>

                <Step>
                  <StepTag>Paso 2</StepTag>
                  <StepText>
                    <p>
                      {"Comunícate con nosotros* por"}{" "}
                      <span className="whatsapp">Whatsapp</span>{" "}
                      {"al mismo número indicando:"}
                    </p>

                    <p style={{ fontWeight: "bold" }}>
                      {"Tu nombre y el correo de tu cuenta en Aprendiendo.la"}
                    </p>

                    <p>Te daremos acceso a tus clases al confirmar tu pago.</p>

                    <p>*Atendemos todos los días de 9:00am a 7:00pm.</p>
                  </StepText>
                </Step>
              </StepContainer>
              <ButtonContainer>
                <div className="button-wrapper" />
              </ButtonContainer>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default YapeModal;
