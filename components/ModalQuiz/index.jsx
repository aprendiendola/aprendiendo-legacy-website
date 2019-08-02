import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import {
  Header,
  Container,
  Title,
  Dash,
  Section,
  Footer,
  ScoreContainer,
  Score,
  Label,
  Text,
  ButtonsContainer,
  Button,
  SuccessPet,
  SecondaryButton,
  ModalContainer
} from './styles';

const propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
  children: PropTypes.node,
  isSubmit: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  userScore: PropTypes.number,
  totalScore: PropTypes.number.isRequired,
  title: PropTypes.string,
  showSuccess: PropTypes.bool,
  showAnswers: PropTypes.func.isRequired
};

const defaultProps = {
  fullScreen: false,
  children: 'Add content through children nodes',
  isSubmit: false,
  userScore: 0,
  title: 'Quiz',
  showSuccess: false
};

const Modal = ({
  active,
  handleClose,
  fullScreen,
  children,
  isSubmit,
  submit,
  reset,
  show,
  userScore,
  totalScore,
  title,
  showSuccess,
  showAnswers
}) => (
  <div className={`modal ${active ? 'is-active' : ''}`} style={{ zIndex: '2000000001' }}>
    <div role="presentation" className="modal-background" onClick={handleClose} />
    <div
      className={`modal-content modal-card ${fullScreen ? 'is-full-screen' : ''}`}
      style={showSuccess ? { width: '459px' } : {}}
    >
      <Header className="modal-card-head">
        <Container>
          {showSuccess ? (
            <Fragment>
              <SuccessPet />
              <Title className="modal-card-title">¡Bien hecho!</Title>
              <Dash />
            </Fragment>
          ) : (
            <Fragment>
              <Title className="modal-card-title">{title}</Title>
              <Dash />
            </Fragment>
          )}
        </Container>
        <button type="button" className="delete" aria-label="close" onClick={handleClose} />
      </Header>
      <Section className="modal-card-body" showSuccess={showSuccess}>
        {showSuccess
          ? `Respondiste todas las preguntas correctas,
          sigue así y la romperás en clase`
          : children}
      </Section>
      <Footer className="modal-card-foot">
        {showSuccess ? (
          <Fragment>
            <Button onClick={handleClose} style={{ width: '128px', height: '38px' }}>
              Continuar
            </Button>
            <SecondaryButton
              margin="0 0 0 10px"
              onClick={showAnswers}
              style={{ width: '128px', height: '38px' }}
            >
              Ver respuestas
            </SecondaryButton>
          </Fragment>
        ) : (
          <ScoreContainer>
            {show && (
              <Container>
                <Text>
                  <Label>Tu puntaje</Label>
                  <Score hasMarginRight>{userScore}</Score>
                  <Score color="#828282" fontWeight="normal" hasMarginRight>
                    de
                  </Score>
                  <Score>{totalScore}</Score>
                </Text>
                <Line
                  percent={String((userScore * 100) / totalScore) || '0'}
                  strokeWidth="5"
                  trailWidth="5"
                  strokeColor="#87e400"
                  trailColor="#eeeeef"
                  strokeLinecap="square"
                />
              </Container>
            )}
            <ButtonsContainer>
              <Button disabled={isSubmit} margin="0 14px 0 0" onClick={submit}>
                Confirmar
              </Button>
              <Button disabled={!isSubmit} onClick={reset}>
                Reintentar
              </Button>
            </ButtonsContainer>
          </ScoreContainer>
        )}
      </Footer>
    </div>
  </div>
);

Modal.propTypes = propTypes;

Modal.defaultProps = defaultProps;

export default Modal;
