import React, { Fragment } from 'react';
import DefaultModal from 'components/atoms/DefaultModal';
import { TitleSection, LargeButton } from 'components';
import referralSuccessImage from 'assets/images/referral_success.svg';
import {
  BrokenHeartImage,
  LoveLetterContainer,
  Paragraph,
  ModalFooterContainer
} from '../../../pages/Profile/components/Configuration/styles';

const ReferralSuccessModal = ({
  amount, modalActive, toggleModal
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
      <BrokenHeartImage src={referralSuccessImage} alt="referral-success" style={{ left: '30%' }} />
      <div className="box" style={{ padding: '84px 34px 34px 34px', maxWidth: '554px', width: '100%' }}>
        <TitleSection title="¡Felicitaciones!" subTitle="Tu descuento se aplicó correctamente" />
        <LoveLetterContainer />
          <Fragment>
            <Paragraph style={{ fontWeight: 900, textAlign: 'center' }}>
              En tu próximo pago te descontaremos S/{amount}
            </Paragraph>
          </Fragment>
        <ModalFooterContainer>
          <LargeButton outlined handleClick={toggleModal} style={{ marginLeft: '12px' }}>
            Cerrar
          </LargeButton>
        </ModalFooterContainer>
      </div>
    </DefaultModal>
  );
};

export default ReferralSuccessModal;
