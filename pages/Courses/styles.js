import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Label } from 'components';
import blueBkg from 'assets/images/header_blue.svg';

const CoursesHeaderContainer = styled.div`
  display: flex;  
  background-color: ${({ hasColor }) => hasColor || '#fff'};
  ${({ hasColor }) => (hasColor ? '' : `background-image: url(${blueBkg});`)}
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 155px;
  justify-content: center;
  padding: 0 30px;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1275px;
  display: flex;
  align-items: center;
`;

const Title = styled(props => <Label {...props} />)`
  font-size: 33px;
  font-weight: 900;
  color: #fff;
`;

const HideOnMobile = styled.div`
  display: none;
  ${breakpoint('lg')`
    display: flex;
  `}
`;

const HideOnDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  align-items: center;
  ${breakpoint('sm')`
    padding: 25px 80px;
  `}
  ${breakpoint('md')`
    padding: 25px 80px;
  `}
  ${breakpoint('lg')`
    display: none;
    margin: 0;
    padding: 0;
  `}
`;

export {
  CoursesHeaderContainer,
  TitleContainer,
  Title,
  HideOnMobile,
  HideOnDesktop
};
