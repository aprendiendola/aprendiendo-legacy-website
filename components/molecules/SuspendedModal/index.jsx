import React, { Fragment } from 'react';
import DefaultModal from 'components/atoms/DefaultModal';
import { TitleSection, LargeButton } from 'components';
import suspendedCard from 'assets/images/suspended-card.svg';

import {
  BrokenHeartImage,
  LoveLetterContainer,
  Paragraph,
  ModalFooterContainer
} from '../../../pages/Profile/components/Configuration/styles';

const FreezedModal = ({
  modalActive, toggleModal, onOk
}) => {
  return (
    <DefaultModal
      active={modalActive}
      removeOverflow
      fullScreen
      handleClose={() => {
        toggleModal();
      }}
    >
      <BrokenHeartImage src={suspendedCard} alt="broken-heart" style={{ left: '35%' }} />
      <div className="box" style={{ padding: '84px 34px 34px 34px', maxWidth: '554px', width: '100%' }}>
        <TitleSection title="Tu suscripción está suspendida" />
        <LoveLetterContainer />
        <Fragment>
          <Paragraph>
            Después de reiterados intentos, no pudimos procesar la renovación de tu plan Premium. Pero no te
            preocupes, puedes reactivarla fácilmente.
          </Paragraph>
        </Fragment>
        <ModalFooterContainer>
          <LargeButton style={{ padding: '0px 16px' }} handleClick={onOk}>
            Reactivar
          </LargeButton>
          <LargeButton outlined handleClick={toggleModal} style={{ marginLeft: '12px' }}>
            Cerrar
          </LargeButton>
        </ModalFooterContainer>
      </div>
    </DefaultModal>
  );
};

export default FreezedModal;
