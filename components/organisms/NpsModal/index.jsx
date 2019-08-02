import React from 'react';
import imageUrl from '/static/images/nps-guy.svg';
import DefaultModal from '../../atoms/DefaultModal';
import TitleSection from '../../molecules/titleSection';
import NpsForm from './NpsForm';

import { ModalContainer, Content, ContentWrapper, ImageWrapper, ModalImage } from './styles';

export default ({
  showModal, handleSubmit, handleClose, userName, courseName, teacherName
}) => (
  <DefaultModal active={showModal} handleClose={handleClose} medium>
    <ModalContainer>
      <ImageWrapper>
        <ModalImage src={imageUrl} />
      </ImageWrapper>
      <ContentWrapper>
        <Content>
          <TitleSection title={`¡Hola ${userName}!`} subTitle="Ayúdanos a mejorar" />
          <NpsForm
            handleClose={handleClose}
            onSubmit={handleSubmit}
            pollId={2}
            courseName={courseName}
            teacherName={teacherName}
          />
        </Content>
      </ContentWrapper>
    </ModalContainer>
  </DefaultModal>
);
