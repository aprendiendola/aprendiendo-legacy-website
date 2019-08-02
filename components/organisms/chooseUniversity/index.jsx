import React from 'react';
import facebookPixel from 'utils/facebook';
import { Label, TitleSection, CustomLink } from 'components';
import { lightenDarkenColor } from 'utils/common';
import {
  Section,
  UniversityCardsContainer,
  UniversityCard,
  CardContainer,
  CardColorBrand
} from './styles';

const ChooseUniversity = ({ universities }) => {
  return (
    <Section style={{ padding: '15px' }} id="chooseUniversity" >
      <TitleSection
        title="Elige tu universidad"
      />
      <UniversityCardsContainer>
        {universities.map(({
          id, name, color, short_name: shortName, stats: { data: { courses, enrollments } }
        }) => {
          return (
            <CustomLink
              path={`/cursos/search?university=${shortName}`}
              key={id}
            >
              <a
                style={{ textDecoration: 'none', color: '#fff', margin: 'auto' }}
                onClick={() => facebookPixel.selectUniversity({ University: shortName })}
              >
                <UniversityCard key={id}>
                  <CardContainer shortName={shortName}>
                    <Label
                      color="#414042"
                      weight="black"
                      fontSize="20px"
                      maxWidth="213px"
                      minWidth="184px"
                      minHeight="48px"
                      isClickable
                    >
                      {name}
                    </Label>
                    <Label
                      color="#626262"
                      fontSize="14px"
                      isClickable
                    >
                      {enrollments > 10 ? `${enrollments} Alumnos inscritos` : 'Nueva Universidad'}
                    </Label>
                  </CardContainer>
                  <CardColorBrand linearGradient={`${color} 30%, ${lightenDarkenColor(color, 50)} 100%`}>
                    <Label
                      color="#fff"
                      fontSize="14px"
                      isClickable
                    >
                      {`${courses} Cursos`}
                    </Label>
                  </CardColorBrand>
                </UniversityCard>
              </a>
            </CustomLink>
          );
        })}
      </UniversityCardsContainer>
    </Section>
  );
};

export default ChooseUniversity;
