import React from 'react';
import { Label, TitleSection, Paragraph } from 'components';
import {
  SpecialSectionContainer,
  Container,
  SpecialTitleSection,
  FeedbackContainer,
  FeedbackSection,
  FeedbackCard,
  FeedbackColor,
  FeedbackAvatar,
  FeedbackContent
} from './styles';

const Feedback = () => {
  return (
    <SpecialSectionContainer>
      <FeedbackSection />
      <Container>
        <SpecialTitleSection>
          <TitleSection title="Lo que dicen de nosotros" extraTitle />
          <Paragraph fontSize="16px" color="#626262" textAlign="left" marginBottom="20px">
            Nuestros estudiantes están satisfechos con los resultados.
          </Paragraph>
          <Paragraph fontSize="16px" color="#626262" textAlign="left" marginBottom="35px">
            Al 90% de nuestros alumnos les fue mejor de lo que esperaban basándose en sus notas.
          </Paragraph>
        </SpecialTitleSection>
        <FeedbackContainer>
          <FeedbackCard>
            <FeedbackAvatar url="https://s3.amazonaws.com/pe.aprendiendo.la/feedback/feedback-1-jimena.jpg" />
            <FeedbackColor />
            <FeedbackContent>
              <Label fontSize="16px" weight="black" color="#0fa3f4">
                Jimena Ayala
              </Label>
              <Label fontSize="16px" weight="bold" color="#d1d3d4" marginBottom="22px">
                Universidad del Pacífico
              </Label>
              <Label fontSize="16px" color="#626262">
                "Al inicio dudaba porque es virtual pero luego de ver una clase gratis pagué por todo el
                paquete de Contabilidad I y fue lo máximo! Podía ver las clases en cualquier lugar y las veces
                que quería."
              </Label>
            </FeedbackContent>
          </FeedbackCard>
          <FeedbackCard>
            <FeedbackAvatar url="https://s3.amazonaws.com/pe.aprendiendo.la/feedback/feedback-2-zully.jpg" />
            <FeedbackColor />
            <FeedbackContent>
              <Label fontSize="16px" weight="black" color="#0fa3f4">
                Zully Montes
              </Label>
              <Label fontSize="16px" weight="bold" color="#d1d3d4" marginBottom="22px">
                Universidad Peruana de Ciencias Aplicadas
              </Label>
              <Label fontSize="16px" color="#626262">
                "Me encantó, puedo ver los videos en la comodidad de mi hogar. Recomendado ."
              </Label>
            </FeedbackContent>
          </FeedbackCard>
          <FeedbackCard>
            <FeedbackColor />
            <FeedbackContent>
              <FeedbackAvatar url="https://s3.amazonaws.com/pe.aprendiendo.la/feedback/feedback-3-carolina.jpg" />
              <Label fontSize="16px" weight="black" color="#0fa3f4">
                Carolina Luque
              </Label>
              <Label fontSize="16px" weight="bold" color="#d1d3d4" marginBottom="22px">
                Universidad del Pacífico
              </Label>
              <Label fontSize="16px" color="#626262">
                "El profe es super claro, me acomoda mucho el tema de horarios y me pareció que el material
                estaba completo."
              </Label>
            </FeedbackContent>
          </FeedbackCard>
        </FeedbackContainer>
      </Container>
    </SpecialSectionContainer>
  );
};

export default Feedback;
