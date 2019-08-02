import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import visaCard from 'assets/images/visaCard.svg';
import masterCard from 'assets/images/masterCard.svg';
import superFlyingGuy from 'assets/images/super-flying-guy.svg';
import superFlyingGuyShape from 'assets/images/super-flying-guy-shape.svg';

const PageContainer = styled.div`
  padding: 20px 0px;
  ${breakpoint('sm')`
  padding: 0;
  `}
`;

const ModalContentWrapper = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 68px 38px 24px 38px;

  ${breakpoint('sm')`
  width: 545px;
  `}
`;

const SectionTitle = styled.label`
  font-size: 16px;
  font-weight: 900;
  color: #0fa3f4;
  margin-bottom: 20px;
  width: 290px;
  align-self: center;
  ${breakpoint('sm')`
  width: auto;
  margin-left: 16px;
  align-self: flex-start;
  `}

  `;

const BillingInfoContainer = styled.div`
  font-size: 14px;
  color: #626262;
  padding-top: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const KeyLabel = styled.label`
  width: 138px;
`;

const ValueSection = styled.div`
  font-weight: 900;
`;

const Card = styled.img`
  width: 30px;
  margin-right: 4px;
  position: relative;
  top: 2px;
`;

const FreezeSubscriptionSection = styled.div`
  padding: 28px;
  border: 1px solid #d1d3d4;
  border-radius: 13px;
  font-size: 14px;
  color: #626262;
  max-width: 750px;
`;

const UnsubscribeButton = styled.button`
  display: flex;
  border-style: none;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background: #d1d3d4;
  transition: background 0.1s ease-in-out;
  border-radius: 24px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  text-decoration: none;
  width: 153px;
  height: 34px;
  padding: 0px 41px;
  min-width: 0;
  font-size: 14px;
  margin: 16px 0;
  font-weight:900;
  color: #fff;
  background: #d1d3d4
  z-index: 1;
  :hover {
    cursor: pointer;
  }
  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const SuperFlyingGuy = styled.div`
  background: url(${superFlyingGuy});
  width: 435px;
  height: 350px;
  background-repeat: no-repeat !important;
  background-position: center;
  position: absolute;
  right: 75px;
  background-size: contain !important;
  top: 302px;
  display: none;
  ${breakpoint('sm')`
    width: 300px;
    display: block;
  `}
  ${breakpoint('md')`
    width: 435px;
  `}
`;

const SubscriptionSection = styled.div`
  padding: 20px 0px;
`;

const SectionSubtitle = styled.p`
  font-weight: 800;
  font-size: 14px;
`;

const SuperFlyingGuyShape = styled.div`
  background: url(${superFlyingGuyShape});
  width: 900px;
  height: 900px;
  background-repeat: no-repeat !important;
  background-position: center;
  position: absolute;
  right: -415px;
  background-size: contain !important;
  top: 48px;
  display: none;
  ${breakpoint('sm')`
    width: 800px;
    display: block;
  `}
  ${breakpoint('md')`
    width: 900px;
  `}
`;

const Loading = styled.img`
  width: 55px;
  margin: 126px auto;
`;

const LoveLetterContainer = styled.div`
  margin: 38px 34px;
`;

const Paragraph = styled.p`
  color: #626262;
  font-family: 'Lato';
  text-align: left;
  font-size: 15px;
`;

const StrongParagraph = styled.p`
  margin: 20px 0;
  font-weight: bold;
  text-align: left;
`;

const BrokenHeartImage = styled.img`
  position: absolute;
  width: 182px;
  left: 30%;
  top: -82px;
`;

const OutlineButton = styled.button`
  border: 1px solid #1178f2;
  border-radius: 25px;
  font-family: Lato;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 900;
  color: #1178f2;
  letter-spacing: normal;
  line-height: normal;
  mix-blend-mode: undefined;
  object-fit: contain;
  text-align: center;
  min-width: 94px;
  padding: 7px 18px;
  background: transparent;
  margin: 0 7px;
`;

const ModalFooterContainer = styled.div`
  text-align: right;
  margin-top: 40px;
`;

const dangerColors = 'linear-gradient(265deg, #f92a2a, #a81717);';
const successColors = 'linear-gradient(75deg, #4e87d0, #7edfb5);';

const Alert = styled.div`
  width: 100%;
  padding: 0 32px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 23px;
  height: 61px;
  color: #fff;
  align-items: center;
  display: flex;
  border-radius: 10px;
  background: ${({ danger }) => {
    if (danger) return dangerColors;
    return successColors;
  }};
`;

const P1 = styled.p`
  margin: 10px 0px;
`;

const P6 = styled.p`
  margin: 10px 0px;
  font-size: 12px;
`;

const WarningText = styled.p`
  font-size: 16px;
  color: #e6445e;
`;

const CARD_ICONS = {
  VISA: visaCard,
  MASTERCARD: masterCard
};

export {
  SectionTitle,
  Alert,
  Card,
  BillingInfoContainer,
  FreezeSubscriptionSection,
  InfoSection,
  KeyLabel,
  LoveLetterContainer,
  UnsubscribeButton,
  Paragraph,
  StrongParagraph,
  ValueSection,
  SuperFlyingGuy,
  BrokenHeartImage,
  SuperFlyingGuyShape,
  Loading,
  OutlineButton,
  ModalFooterContainer,
  CARD_ICONS,
  P1,
  P6,
  PageContainer,
  ModalContentWrapper,
  WarningText,
  SubscriptionSection,
  SectionSubtitle
};
