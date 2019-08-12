import React, { Fragment } from 'react';
import DefaultModal from 'components/atoms/DefaultModal';
import { TitleSection, LargeButton } from 'components';
import freezedLaptop from 'assets/images/freezed-laptop.svg';
import moment from 'moment';

import {
  BrokenHeartImage,
  LoveLetterContainer,
  Paragraph,
  ModalFooterContainer
} from '../../../pages/Profile/components/Configuration/styles';

const FreezedModal = ({
  user, modalActive, toggleModal, unfreeze, loading, subscription, errorOnFreeze
}) => {
  const freezeDate = moment(subscription.freeze_date).format('DD-MM-YYYY');
  const unfreezeDate = moment(subscription.freeze_date).add(1, 'months').format('DD-MM-YYYY');
  return (
    <DefaultModal
      active={modalActive}
      removeOverflow
      fullScreen
      handleClose={() => {
        toggleModal();
      }}
    >
      <BrokenHeartImage src={freezedLaptop} alt="broken-heart" style={{ left: '35%' }} />
      <div className="box" style={{ padding: '84px 34px 34px 34px', maxWidth: '554px', width: '100%' }}>
        <TitleSection title="Tu cuenta está congelada" />
        <LoveLetterContainer />
        {errorOnFreeze ? ('Ocurrió un error al descongelar tu suscripción') : (
          <Fragment>
            <Paragraph>
              Congelaste tu cuenta el <strong>{freezeDate}</strong>, y se descongelará automáticamente el <strong>{unfreezeDate}.</strong>
            </Paragraph>
            <Paragraph style={{ marginTop: '10px' }}>
              Si quieres seguir estudiando, puedes descongelarla desde aquí:
            </Paragraph>
          </Fragment>
        )}
        <ModalFooterContainer>
          <LargeButton style={{ padding: '0px 16px', marginBottom: '12px' }} loading={loading} handleClick={unfreeze}>
            Descongelar
          </LargeButton>
          <LargeButton outlined handleClick={toggleModal}>
            Cerrar
          </LargeButton>
        </ModalFooterContainer>
      </div>
    </DefaultModal>
  );
};

export default FreezedModal;
