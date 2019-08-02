import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Label } from 'components';

const Container = styled.div`
  text-align: center;
`;

const BenefitList = styled.ul`
  text-align: left;
  list-style: none;
  margin: 0 0 12px 0;
  li {
    color: #626262;
    line-height: 26px;
  }
`;

const BlueCheck = styled.img`
  width: 12px;
  margin-right: 8px;
`;

const SubscriptionText = styled(props => <Label {...props} />)`
  font-size: 16px;
  ${breakpoint('md')`
    font-size: 20px;
  `}
`;

const LiText = styled.span`
  font-size: 14px;
  line-height: 15px;
  width: 100%;
  color: ${({ isBasicPlan }) => (isBasicPlan ? '#b4b4b4' : '#626262')};
`;

const OfferContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const OfferText = styled.span`
  font-size: 16px;
  margin-bottom: 8px;
`;

export { Container, SubscriptionText, BenefitList, BlueCheck, LiText, OfferContainer, OfferText };
