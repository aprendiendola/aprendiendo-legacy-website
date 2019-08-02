import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Button, Label } from 'components';
import blueCheck from 'assets/images/icons/blue-check.svg';
import bkgShape from 'assets/images/bkg-feature-plan.svg';

export const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 337px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  position: relative;
  padding: 0 0 15px;
  z-index: 2;
  ${breakpoint('lg')`
    box-shadow: ${({ isFeatured }) => (isFeatured ? '0 3px 20px 0 rgba(0, 0, 0, 0.16)' : 'initial')};
    border-left: initial;
    ${({ isFeatured }) => (!isFeatured ? 'border-right: 1px solid #e8e9ea' : '')};
    border-top: initial;
    border-bottom: initial;
    ${({ isFeatured }) => (!isFeatured ? 'border-radius: initial;' : 'z-index: 3;')}
  `}
`;

export const Tag = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 162px;
  height: 26px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  display: ${({ isFeatured }) => (isFeatured ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-bottom: 45px;
  padding-top: 15px;
  ${({ isFeatured }) =>
    (isFeatured
      ? `
    background-image: url(${bkgShape});
    background-position-y: -80px;
    background-position-x: center;
    background-repeat: no-repeat;
    background-size: 345px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    `
      : '')} )
`;

export const MainTitle = styled(props => <Label {...props} />)`
  display: flex;
  font-size: 30px;
  font-weight: 900;
  margin: 15px auto;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: auto;
  margin-bottom: 7px;
`;

export const Price = styled(props => <Label {...props} />)`
  font-size: 54px;
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  position: relative;
  line-height: 0.9;
`;

export const MoneySymbol = styled(props => <Label {...props} />)`
  font-size: 28px;
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  align-items: flex-start;
`;

export const MonthlyText = styled(props => <Label {...props} />)`
  font-size: 23px;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  bottom: 9px;
  align-items: flex-end;
`;

export const Subtitle = styled(props => <Label {...props} />)`
  font-size: 20px;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  margin: auto;
  margin-bottom: 20px;
`;

export const StyledButton = styled(props => <Button {...props} />)`
  border: 1px solid ${({ isFeatured }) => (isFeatured ? '#87e400' : '#1178f2')};
  background-color: ${({ isFeatured }) => (isFeatured ? '#87e400' : '#fff')};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;
  min-width: 215px;
  padding: 10px 20px;
  margin: 0px auto 25px;
  ${breakpoint('md')`
    min-width: 190px;
  `}
`;

export const ButtonLabel = styled(props => <Label {...props} />)`
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#1178f2')};
  font-size: 20px;
  ${breakpoint('md')`
    font-size: 16px;
  `}
`;

export const CurrentPlanLabel = styled(props => <Label {...props} />)`
  font-size: 16px;
  font-weight: 900;
  color: #414042;
  align-self: center;
`;

export const InformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 25px;
  ${breakpoint('lg')`
    justify-content: center;
  `}
`;

export const InfoContent = styled(props => <Label {...props} />)`
  font-size: 14px;
  color: #414042;
  width: 140px;
  ${breakpoint('lg')`
    display: none;
  `}
`;

export const InfoValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

export const InfoValue = styled(props => <Label {...props} />)`
  font-size: 16px;
  color: #414042;
  ${({ hasBenefit }) =>
    (typeof hasBenefit === 'boolean' && hasBenefit
      ? `
    background-image: url(${blueCheck});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 17px;
    height: 20px;
  `
      : '')}
`;

export const DividerContainer = styled.div`
  height: 51px;
  width: 100%;
  position: relative;
  background-color: #f9f9f9;
`;

export const Divider = styled.div`
  height: 51px;
  width: 100%;
  left: 0;
  display: flex;
  padding-left: 25px;
  align-items: center;
  position: absolute;
  ${breakpoint('lg')`
    display: none;
  `}
`;
