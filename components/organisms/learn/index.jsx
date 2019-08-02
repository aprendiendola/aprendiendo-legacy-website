import React, { Fragment } from 'react';
import { TitleSection, Paragraph } from 'components';
import {
  Section,
  LearnContainer,
  IconsSectionContainer,
  IconContainer,
  Icon,
  IconTitle,
  IconSubtitle,
  Shape
} from './styles';

const Learn = ({
  title, text, icon1, icon2, icon3, icon4, hideBackground, styleContainer, withButton, customTitle, marginTop, customSubtitle
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <Section style={{ padding: '15px', marginTop: marginTop || '0px' }}>
        {!customTitle
          ? (
            <TitleSection
              title={title}
            />
          ) : (customTitle) }

        {!customSubtitle
          ? (
            <Paragraph center style={{ maxWidth: '600px' }} centerOnMobile fontSize="20px" color="#626262" textAlign="center" margin="auto">
              {text}
            </Paragraph>
          )
          : (customSubtitle)
        }
      </Section>
      <LearnContainer hideBackground={hideBackground}>
        <IconsSectionContainer withButton={withButton}>
          <IconContainer style={styleContainer}>
            <Icon image={icon1.iconImg} />
            <IconTitle
              weight="black"
              marginBottom
            >
              {icon1.iconTitle}
            </IconTitle>
            <IconSubtitle>
              {icon1.iconSubtitle}
            </IconSubtitle>
          </IconContainer>
          <IconContainer style={styleContainer}>
            <Icon image={icon2.iconImg} />
            <IconTitle
              weight="black"
              marginBottom
            >
              {icon2.iconTitle}
            </IconTitle>
            <IconSubtitle>
              {icon2.iconSubtitle}
            </IconSubtitle>
          </IconContainer>
        </IconsSectionContainer>
        <IconsSectionContainer withButton={withButton}>
          <IconContainer style={styleContainer}>
            <Icon image={icon3.iconImg} />
            <IconTitle
              weight="black"
              marginBottom
            >
              {icon3.iconTitle}
            </IconTitle>
            <IconSubtitle>
              {icon3.iconSubtitle}
            </IconSubtitle>
          </IconContainer>
          <IconContainer style={styleContainer}>
            <Icon image={icon4.iconImg} />
            <IconTitle
              weight="black"
              marginBottom
            >
              {icon4.iconTitle}
            </IconTitle>
            <IconSubtitle>
              {icon4.iconSubtitle}
            </IconSubtitle>
          </IconContainer>
        </IconsSectionContainer>
      </LearnContainer>
      <Shape hideBackground={hideBackground} />
    </div>
  );
};

export default Learn;
