import React from 'react';
import { TitleSection, LargeButton, DefaultModal } from 'components';
import moment from 'moment';
import RadioButtonGroup from 'components/RadioButtonGroup';
import RadioButton from 'components/RadioButton';

import {
  StrongParagraph,
  LoveLetterContainer,
  Paragraph,
  ModalFooterContainer,
  ModalFooterWrapper
} from '../styles';

const FirstScreen = ({ user, onAgree, toggleModal }) => (
  <div>
    <TitleSection title="No nos dejes" />
    <LoveLetterContainer />
    <Paragraph>
      Estamos juntos desde el <strong>{moment(user.created_at.date).format('DD/MM/YYYY')}</strong>, hemos
      pasado por momentos bonitos y difíciles: momentos estresantes antes de tu examen, celebramos juntos
      tus buenas calificaciones y a pesar de todo eso...
    </Paragraph>

    <StrongParagraph>¿Nos piensas dejar tan fácilmente?</StrongParagraph>

    <Paragraph>
      Prometemos mejorar por ti cada día y aunque nos dejes, respetamos tu decisión y estaremos con los
      brazos abiertos para recibirte y seguir aprendiendo juntos.
    </Paragraph>
    <ModalFooterContainer>
      <ModalFooterWrapper>
        <div style={{ padding: '5px 10px'}}>
          <LargeButton shadow large handleClick={onAgree}>
            Adiós
          </LargeButton>
        </div>
        <div style={{ padding: '5px 10px'}}>
          <LargeButton shadow handleClick={toggleModal} large outlined>
            Volver
          </LargeButton>
        </div>
      </ModalFooterWrapper>
    </ModalFooterContainer>
  </div>
);

const SecondScreen = ({
  loading,
  toggleModal,
  onReasonChange,
  onOtherTextChange,
  cancelFormData,
  onUnsuscribe  
}) => (
  <div>
    <TitleSection title="Espera" paddingBottom="0px" />
    <div style={{ padding: '20px 0px' }}>
      <StrongParagraph>Antes que te vayas, nos gustaría saber el motivo.</StrongParagraph>
      <Paragraph>
        Nos ayudarías demasiado para mejorar y darte una mejor experiencia.
      </Paragraph>
    </div>
    <RadioButtonGroup
      name='churn_reasons'
      title="¿Por qué nos dejas?"
      onChange={e => {
        onReasonChange(e);
      }}
      value={cancelFormData.selectedReason}
    >
      <RadioButton key='is_expensive' value='is_expensive' label='Es muy caro' />
      <RadioButton key='cant_study_online' value='cant_study_online' label='No me convenció estudiar online' />
      <RadioButton key='cant_understand_teacher' value='cant_understand_teacher' label='No entiendo al Profesor(a)' />
      <RadioButton key='courses_not_updated' value='courses_not_updated' label='Los cursos no están actualizados' />
      <RadioButton key='dont_need_it_anymore' value='dont_need_it_anymore' label='Ya no me sirve' />
      <RadioButton key='others' value='others' label='Otros' />
    </RadioButtonGroup>
    {cancelFormData.selectedReason === 'others' && (<div style={{ padding: "10px 0px"}}>
      <input
        style={{
          width: '100%',
          padding: 8
        }}
        type="text"
        placeholder="Cuéntanos por qué nos dejas"
        value={cancelFormData.otherText}
        onChange={e => onOtherTextChange(e.target.value)}
      />
    </div>)}
    <ModalFooterContainer>
      <ModalFooterWrapper>
        <div style={{ padding: '5px 10px'}}>
            <LargeButton
              loading={loading}
              disabled={loading}
              style={{
                background: loading && '#07a1fb',
                cursor: loading && 'wait'
              }}
              handleClick={onUnsuscribe}
              shadow
              large
            >
            Sí, cancelar suscripción
          </LargeButton>
        </div>
        <div style={{ padding: '5px 10px'}}>
          <LargeButton shadow large outlined handleClick={toggleModal}>
            Volver
          </LargeButton>
        </div>
      </ModalFooterWrapper>
    </ModalFooterContainer>
  </div>
);

const CancelModal = ({
  user,
  modalActive,
  toggleModal,
  onAgree,
  loading,
  showChurnReasons,
  cancelFormData,
  onReasonChange,
  onOtherTextChange,
  onUnsuscribe
}) => (
  <DefaultModal
    active={modalActive}
    handleClose={() => {
      toggleModal();
    }}
    medium
  >
    <div className="box" style={{ padding: '34px' }}>
      {showChurnReasons ? (
        <SecondScreen {...{
          modalActive,
          onAgree,
          toggleModal,
          loading,
          cancelFormData,
          onReasonChange,
          onOtherTextChange,
          onUnsuscribe
        }} />
      ) : (
        <FirstScreen {...{user, modalActive, onAgree, toggleModal}} />
      )}
    </div>
  </DefaultModal>
);

export default CancelModal;
