import React, { PureComponent } from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import closeIcon from 'assets/images/close-icon.png';
import {
  ModalContent,
  ModalTitle,
  ModalTitleLabel,
  ModalSubtitleLabel,
  ModalBody,
  ModalButtonWrapper
} from './styles';

class ErrorModal extends PureComponent {
  render() {
    const {
      active, closeModal, title, subtitle, info
    } = this.props;

    return (
      <Modal active={active} handleClose={closeModal} fullScreen>
        <ModalContent>
          <div>
            <ModalTitle>
              <ModalTitleLabel>{title}</ModalTitleLabel>
              <ModalSubtitleLabel>{subtitle}</ModalSubtitleLabel>
            </ModalTitle>
            <ModalBody>
              <span>{info}</span>
              <ModalButtonWrapper>
                <Button onClick={closeModal}>Volver</Button>
              </ModalButtonWrapper>
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    );
  }
}

export default ErrorModal;
