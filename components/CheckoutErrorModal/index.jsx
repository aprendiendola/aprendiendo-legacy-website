import React, { PureComponent } from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import closeIcon from 'assets/images/close-icon.png';
import { CONTACT_NUMBER } from 'constants';
import './styles.scss';

class CheckoutErrorModal extends PureComponent {
  render() {
    const { active, closeModal, errorText } = this.props;
    return (
      <Modal active={active} hideClose handleClose={() => closeModal()} fullScreen>
        <div className="modal-content">
          <div>
            <div className="modal-title">
              <img
                alt="close-icon"
                className="icon-close"
                className="close-modal"
                onClick={closeModal}
                src={closeIcon}
              />
              <span className="modal-title-label">LO SENTIMOS</span>
              <span className="modal-subtitle-label">Tu transacción no se efectuó correctamente</span>
            </div>
            <div className="modal-body">
              <span>{errorText || `Intenta con otra tarjeta y si aún no funciona comúnicate al ${CONTACT_NUMBER}`}</span>
              <div className="modal-button-wrapper">
                <Button onClick={() => closeModal()}>Volver</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CheckoutErrorModal;
