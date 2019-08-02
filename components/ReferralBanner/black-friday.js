import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import blueSvg from "assets/images/blue_bg.svg";

const DesktopContainer = styled.div`
  visibility: hidden;
  width: 0;
  height: 0;
  padding: 0;
  margin: 0;
  ${breakpoint('md')`
    visibility: visible;
    padding: 40px;
    flex-direction: row;
    background-image: url(${blueSvg});
      background-size: cover;
    background-position: center;
    width: auto;
    height: auto;
    color: #fff;
    `};
`;

const MobileContainer = styled.div`
  flex-direction: column;
  text-align: center;
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: center;
  background-image: url(${blueSvg});
  background-size: cover;
  background-position: center;
  color: #fff;
  position: relative;
  z-index: 1;
  ${breakpoint('sm')`
    flex-direction: row;
    background-image: url(${blueSvg});
    background-size: cover;
    background-position: center
    `};
  ${breakpoint('md')`
    visibility: hidden;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    `};
`;

const MobileContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  align-items: center;
  text-align: left;
  padding: 0px 15px;
  ${breakpoint('sm')`
    width: 405px;
    text-align: center;
  `};
`;

const OfferText = styled.p`
  font-weight: 700;
  padding: 0px 18px;
  position: relative;
  top: 3px;
  width: 275px;
  font-size: 14px;
  line-height: 17px;
  ${breakpoint('md')`
    font-size: 16px;
    width: auto;
    line-height: 22px;
  `};
`;

const FearlessText = styled.div`
  width: 204px;
  height: 100%;
  background-size: 122%;
  background-position: center;
`;

const FearlessButton = styled.button`
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  background: #fff;
  border: none;
  padding: 6px 22px;
  font-size: 14px;
  color: #288797;
  margin-top: 10px;
  ${breakpoint('md')`
    margin-top:0px;
  `};
`;

const NeonSubtitle = styled.h3`
  color: ${({ color }) => (color === 'blue' ? 'rgb(82, 255, 255)' : '#abfe32')};
  font-weight: 700;
  margin-left: 10px;
  position: relative;
  top: 2px;
  font-size: 12px;
  ${({ withLineHeight }) => (withLineHeight
    ? `
    line-height: 5px;
  `
    : '')}
  ${breakpoint('sm')`
    font-size: 16px;
    ${({ withLineHeight }) => (withLineHeight
    ? `
    line-height: 12px;
  `
    : '')}
    text-shadow: 0 0 0px ${({ color }) => (color === 'blue' ? 'rgb(82, 255, 255)' : '#abfe32')},
    0 0 1px ${({ color }) => (color === 'blue' ? 'rgb(82, 255, 255)' : '#abfe32')},
    0 0 0px ${({ color }) => (color === 'blue' ? 'rgb(82, 255, 255)' : '#abfe32')}, 0 0 0px #fff, 0 0 0px #fff,
    0 0 7px #fff, 0 0 0px #fff;

    `}
`;

export { DesktopContainer, MobileContainer, FearlessText, OfferText, FearlessButton, NeonSubtitle, MobileContent };
