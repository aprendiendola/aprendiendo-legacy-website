import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import shapesBg from 'static/images/shapes-bg.svg';

const BannerContainer = styled.div`
  height: 104px;
  flex-direction: column;
  text-align: center;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-image: url(${shapesBg}), linear-gradient(262deg, #4267b2, #1a4292);
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  color: #fff;
  ${breakpoint('sm')`
    height: 72px;
    flex-direction: row;
  `};
`;

const BannerInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 326px;
  align-items: center;
  ${breakpoint('sm')`
    width: 669px;
  `};
  ${breakpoint('md')`
    width: 760px;
  `};
  img{
    display: none;
    ${breakpoint('sm')`
      display:flex;
   `};
    height: auto;
    max-width: 100%;
    position: relative;
    top: 16px;
  }
  h3{
    font-size: 15px;
    ${breakpoint('md')`
      font-size: 22px;
   `};
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.58;
    letter-spacing: normal;
    text-align: center;
    color: #ffcc00;
  }
  p{
    font-size: 10px;
    text-align: center;
    ${breakpoint('md')`
      font-size: 14px;
   `};
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: #ffffff;
  }
  button{
    width: 120px;
    cursor: pointer;
    ${breakpoint('md')`
      width: 153px;
   `};
    border-radius: 24px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #87e400;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    padding: 9px 0;
  }
  `;

const TextSection = styled.div`
  width: 180px;
  ${breakpoint('sm')`
    width: auto;
  `};
`;

const CloseIcon = styled.img`
  position: fixed;
  right: 13px;
  bottom: 82px;
  ${breakpoint('sm')`
    bottom: 51px;
  `};
  width: 11px;
  `;


export { BannerContainer, BannerInfoContainer, TextSection, CloseIcon };
