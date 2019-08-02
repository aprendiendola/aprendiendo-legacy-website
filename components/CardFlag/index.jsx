import React from 'react';
import styled from 'styled-components';
import './styles.scss';

const StyledFlag = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  height: 21px;
  justify-content: center;
  left: 0;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  top: 16px;
  width: ${({ width }) => width}px;
  z-index: 1;
  background: linear-gradient(45deg, ${({ bgColor }) => bgColor.a} 41%, ${({ bgColor }) => bgColor.b} 100%);

  @media (max-width: 1280px) {
    top: 12px;
  }
`;

const flags = {
  new: {
    title: 'Nuevo',
    color: {
      a: '#88CE00',
      b: '#88CE00'
    },
    width: 65
  },
  free: {
    title: 'Gratis',
    color: {
      a: '#00ACF0',
      b: '#00ACF0'
    },
    width: 65
  },
  isComingSoon: {
    title: 'Próximamente',
    color: {
      a: 'rgb(145, 44, 234)',
      b: 'rgb(182, 5, 255)'
    },
    width: 110
  }
};

const CardFlag = ({ type }) => (
  <StyledFlag bgColor={flags[type].color} width={flags[type].width}>
    <span className="title-card-flag">{flags[type].title}</span>
  </StyledFlag>
);

export default CardFlag;
