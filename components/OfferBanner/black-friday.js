import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import migratePromoDesktop from 'assets/images/promo-migrate-md.jpg';
import migratePromoTablet from 'assets/images/promo-migrate-sm.jpg';
import migratePromoMobile from 'assets/images/promo-migrate-xs.jpg';

import freezedPromoDesktop from 'assets/images/promo-freezed-lg.png';
import freezedPromoTablet from 'assets/images/promo-freezed-sm.png';
import freezedPromoMobile from 'assets/images/promo-freezed-xs.png';

import accountSuspendedDesktop from 'assets/images/account-suspended-lg.svg';
import accountSuspendedTablet from 'assets/images/account-suspended-sm.svg';
import accountSuspendedMobile from 'assets/images/account-suspended-xs.svg';

import unfreezeAccountDesktop from 'assets/images/unfreeze-account-lg.svg';
import unfreezeAccountTablet from 'assets/images/unfreeze-account-sm.svg';
import unfreezeAccountMobile from 'assets/images/unfreeze-account-xs.svg';


const renderImg = (accessType, hasPaidEnrollments) => {
  if (accessType === 'enrolled' && hasPaidEnrollments) {
    return {
      mobile: migratePromoMobile,
      tablet: migratePromoTablet,
      desktop: migratePromoDesktop
    };
  }
  if (accessType === 'subscribed') {
    return {
      mobile: freezedPromoMobile,
      tablet: freezedPromoTablet,
      desktop: freezedPromoDesktop
    };
  }
  if (accessType === 'suspended') {
    return {
      mobile: accountSuspendedMobile,
      tablet: accountSuspendedTablet,
      desktop: accountSuspendedDesktop
    };
  }
  if (accessType === 'freezed') {
    return {
      mobile: unfreezeAccountMobile,
      tablet: unfreezeAccountTablet,
      desktop: unfreezeAccountDesktop
    };
  }

  return {
    mobile: '', tablet: '', desktop: ''
  };
};

const BannerContainer = styled.div`
  flex-direction: column;
  text-align: center;
  display: flex;
  height: ${({ accessType, hasPaidEnrollments }) => (renderImg(accessType, hasPaidEnrollments).mobile === '' ? '0px' : '72px')};
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-image: url(${({ accessType, hasPaidEnrollments }) => {
    return renderImg(accessType, hasPaidEnrollments).mobile;
  }});
  background-size: cover;
  background-position: center;
  color: #fff;
  position: relative;
  z-index: 1;
  ${breakpoint('sm')`
    height: ${({ accessType, hasPaidEnrollments }) => (renderImg(accessType, hasPaidEnrollments).mobile === '' ? '0px' : '55px')};
    flex-direction: row;
    background-image: url(${({ accessType, hasPaidEnrollments }) => {
    return renderImg(accessType, hasPaidEnrollments).tablet;
  }});
    background-size: cover;
    background-position: center
    `};
  ${breakpoint('md')`
    height: ${({ accessType, hasPaidEnrollments }) => (renderImg(accessType, hasPaidEnrollments).mobile === '' ? '0px' : '55px')};
    flex-direction: row;
    background-image: url(${({ accessType, hasPaidEnrollments }) => {
    return renderImg(accessType, hasPaidEnrollments).desktop;
  }});
      background-size: cover;
    background-position: center
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

export { BannerContainer, FearlessText, OfferText, FearlessButton, NeonSubtitle };
