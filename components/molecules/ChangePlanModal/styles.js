import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Button, Label } from 'components';
import bkgShape from 'assets/images/bkg-feature-plan.svg';
import premiumLogo from 'assets/images/premium_logo.svg';

const ChangePlanContainer = styled.div`
  padding: 34px 34px 70px;
  max-width: 554px;
  width: 100%;
  overflow: scroll;
  max-height: 600px;
  ${breakpoint('sm')`
    max-height: initial;
    max-width: initial;
    overflow: initial;
    width: 700px;
  `}
`;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: row;
  `}
`;

const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  position: relative;
  z-index: 2;
  margin: 0 auto 15px;
`;

const Tag = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 140px;
  height: 26px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  display: ${({ isFeatured }) => (isFeatured ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 15px;
  ${({ isFeatured }) =>
    (isFeatured
      ? `
    background-image: url(${bkgShape});
    background-position-y: 0px;
    background-position-x: center;
    background-repeat: no-repeat;
    background-size: 345px;
    border-radius: 10px;
    `
      : '')} )
`;

const MainTitle = styled(props => <Label {...props} />)`
  display: flex;
  font-size: 25px;
  font-weight: 900;
  margin: 15px auto 0;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: auto;
  margin-bottom: 7px;
`;

const Price = styled(props => <Label {...props} />)`
  font-size: 45px;
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  position: relative;
`;

const MoneySymbol = styled(props => <Label {...props} />)`
  font-size: 22px;
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  align-items: flex-start;
`;

const MonthlyText = styled(props => <Label {...props} />)`
  font-size: 19px;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  bottom: 9px;
  align-items: flex-end;
`;

const Subtitle = styled(props => <Label {...props} />)`
  font-size: 14px;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#414042')};
  margin: auto;
  margin-bottom: 20px;
`;

const StyledButton = styled(props => <Button {...props} />)`
  border: 1px solid ${({ isFeatured }) => (isFeatured ? '#87e400' : '#1178f2')};
  background-color: ${({ isFeatured }) => (isFeatured ? '#87e400' : '#fff')};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;
  min-width: 150px;
  padding: 8px 20px;
  margin: 0px auto 25px;
  height: initial;
  ${breakpoint('md')`
    min-width: 190px;
  `}
`;

const ButtonLabel = styled(props => <Label {...props} />)`
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? '#fff' : '#1178f2')};
  font-size: 20px;
`;

const CurrentPlanLabel = styled(props => <Label {...props} />)`
  font-size: 16px;
  font-weight: 900;
  color: #414042;
  align-self: center;
`;

const DescriptionTitle = styled(props => <Label {...props} />)`
  font-size: 16px;
  font-weight: 900;
  display: flex;
  align-self: center;
  color: #626262;
  text-align: center;
  width: fit-content;
  margin: auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-column-gap: 35px;
  grid-row-gap: 10px;
  margin-top: 30px;
  grid-template-columns: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 245px;
  ${breakpoint('sm')`
    grid-template-columns: auto auto;
    padding: 0px;
    margin-left: auto;
    margin-right: auto;
    max-width: 535px;
  `}

  ${breakpoint('md')`
    grid-template-columns: auto auto;
    padding: 0px;
    margin-left: auto;
    margin-right: auto;
    max-width: 535px;
  `}
`;

const RestrictContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
  justify-content: center;
  align-items: center;
`;

const PremiumLogo = styled.div`
  background-image: url(${premiumLogo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
`;

export {
  ChangePlanContainer,
  PlansContainer,
  SubscriptionContainer,
  Tag,
  Header,
  MainTitle,
  PriceContainer,
  MoneySymbol,
  Price,
  MonthlyText,
  Subtitle,
  CurrentPlanLabel,
  StyledButton,
  ButtonLabel,
  DescriptionTitle,
  BenefitsGrid,
  RestrictContainer,
  PremiumLogo
};
