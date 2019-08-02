import React from 'react';
import Modal from 'components/Modal';
import { TitleSection, LargeButton } from 'components';
import freezedCard from 'assets/images/freezed-card.svg';

import {
  StrongParagraph,
  BrokenHeartImage,
  LoveLetterContainer,
  P1,
  ModalFooterContainer,
  ModalContentWrapper
} from '../styles';

const FreezeModal = ({
  modalActive, toggleModal, freeze, freezeDate, loading
}) => (
  <Modal
    active={modalActive}
    removeOverflow
    fullScreen
    handleClose={() => {
      toggleModal();
    }}
  >
    <div>
      <BrokenHeartImage src={freezedCard} alt="broken-heart" />
      <ModalContentWrapper>
        <TitleSection title="¿Estás seguro?" />
        <LoveLetterContainer />
        <P1>¿Seguro que deseas congelar tu Plan Premium?</P1>

        <P1>
          Solo puedes congelar 2 veces dentro del año a partir del día en que adquiriste tu Plan Premium.
        </P1>

        <P1>
          Recuerda que estará congelado hasta el <strong>{freezeDate}</strong>.
        </P1>

        {/* <StrongParagraph>¿Por qué congelas tu Plan Premium?</StrongParagraph> */}

        <ModalFooterContainer>
          <LargeButton loading={loading} handleClick={freeze}>
            {loading ? 'Cargando...' : 'Congelar'}
          </LargeButton>
          <LargeButton outlined handleClick={toggleModal} style={{ marginLeft: '12px' }}>
            Volver
          </LargeButton>
        </ModalFooterContainer>
      </ModalContentWrapper>
    </div>
  </Modal>
);

export default FreezeModal;
