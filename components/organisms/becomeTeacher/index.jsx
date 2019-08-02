import React from 'react';
import facebookPixel from 'utils/facebook';
import { TitleSection, Label, Button } from 'components';
import {
  BecomeTeacherContainer, BecomeTeacherImg, SpecialTitleSection, Ellipse
} from './styles';

const BecomeTeacher = () => {
  return (
    <BecomeTeacherContainer>
      <BecomeTeacherImg />
      <SpecialTitleSection>
        <TitleSection title="Conviértete en profesor" extraTitle right />
        <Label fontSize="14px" color="#626262" textAlign="right" marginLeft="auto">
          ¿Eres crack enseñando?
        </Label>
        <Label fontSize="14px" color="#626262" textAlign="right" maxWidth="320px" margin="0 0 38px auto">
          Comparte tus conocimientos y llega a más alumnos de tu universidad en menos tiempo.
        </Label>
        <Button
          onClick={() => {
            facebookPixel.becomeTeacher('Home');
            return window.open('https://profesores.aprendiendo.la', '_blank');
          }}
        >
          <Label color="#fff" weight="black" fontSize="20px" isClickable>
            Comienza aquí
          </Label>
        </Button>
      </SpecialTitleSection>
      <Ellipse />
    </BecomeTeacherContainer>
  );
};

export default BecomeTeacher;
