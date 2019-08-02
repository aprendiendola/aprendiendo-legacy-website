import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import backgroundMobile from 'assets/images/footer-bkg-mobile.svg';
import backgroundTablet from 'assets/images/footer-bkg-tablet.svg';
import backgroundDesktop from 'assets/images/footer-bkg-desktop.svg';
import imageFooter from 'assets/images/image-footer.svg';

const FooterLogo = styled.a`
  background-color: ${({ isSelected }) => (isSelected ? '#57585b' : 'rgba(0, 0, 0, 0)')};
  background-image: url(${({ img }) => img || 'http://via.placeholder.com/350x350'});
  background-size: ${({ backgroundSize }) => backgroundSize || '30px auto'};
  background-repeat: no-repeat;
  background-position: ${({ backgroundPosition }) => backgroundPosition || 'center'};
  cursor: ${({ cursor }) => cursor || 'initial'};
  margin-right: ${({ marginRight }) => marginRight || 'initial'};
  width: ${({ width }) => width || '30px'};
  height: ${({ height }) => height || '30px'};
`;

const Label = styled.label`
  align-items: center;
  align-self: center;
  display: flex;
  font-family: ${({ fontFamily }) => fontFamily || 'Lato'};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  font-weight: ${({ fontWeight }) => fontWeight || 'initial'};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  margin-bottom: ${({ marginBottom }) => marginBottom || 'initial'};
  margin: ${({ margin }) => margin || 'initial'};
  color: ${({ color }) => color || '#fff'};
  ${breakpoint('sm')`
    align-self: initial;
  `}
`;

const PaymentOptionContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  ${breakpoint('sm')`
    margin-bottom: 0;
  `}
`;

const Div = styled.div`
  display: flex;
  background-image: url(${backgroundMobile});
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 665px;
  justify-content: center;
  ${breakpoint('sm')`
    background-image: url(${backgroundTablet});
    background-size: auto 530px;
  `}
  ${breakpoint('md')`
    background-image: url(${backgroundDesktop});
    background-size: auto 470px;
    height: 470px;
    align-items: center;
  `}
`;

const NewFooterContainer = styled.div`
  flex-direction: column;
  padding: 15px;
  ${breakpoint('md')`
    width: 450px;
    height: 370px;
    padding-top: 30px;
  `}
`;

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: auto;
  ${breakpoint('sm')`
    max-width: 717px;
    margin: 0 auto 0 auto;
  `}
`;

const NewCopyRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 39px;
  ${breakpoint('sm')`
    flex-direction: row;
    justify-content: flex-end;
    max-width: 1280px;
    margin: auto;
  `}
`;

const Dash = styled.div`
  width: 28px;
  background-color: #626262;
  border: 1px solid #626262;
  margin-bottom: 20px;
  ${breakpoint('sm')`
    height: 26px;
    width: 0;
    border: initial;
    border-left: 1px solid #626262;
    margin: 0 10px;
  `}
  ${breakpoint('md')`
    height: 26px;
    width: 0;
    border: initial;
    border-left: 1px solid #626262;
    margin: 0 10px;
  `}
`;

const FooterImgContainer = styled.div`
  display: flex;
  width: 250px;
  height: 195px;
  margin: 0 0 0 30px;
  position: relative;
  ${breakpoint('sm')`
    width: 380px;
    height: 270px;
  `}
  ${breakpoint('md')`
    display: none;
  `}
`;

const FooterImg = styled.div`
  display: flex;
  background-image: url(${imageFooter});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 250px;
  width: 250px;
  height: 195px;
  position: absolute;
  top: -10px;
  left: 0;
  ${breakpoint('sm')`
    background-size: 380px;
    width: 380px;
    height: 270px;
  `}
  ${breakpoint('md')`
    background-size: 500px;
    width: 500px;
    height: 380px;
    top: -45px;
  `}
`;

const ImgContainer = styled.div`
  display: none;
  ${breakpoint('md')`
    display: flex;
    width: 500px;
    position: relative;
    height: 380px;
  `}
`;

const FooterContentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 0 0;
  justify-content: space-between;
  margin-bottom: 100px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 147px;
  label {
    margin-bottom: 10px;
  }
  ${breakpoint('sm')`
    margin-right: auto;
  `}
`;

const SocialContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Social = styled.div`
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: ${({ size }) => size || '23px'};
  background-position: left;
  width: 23px;
  height: 23px;
`;

const MainFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 375px;
  margin: auto;
  ${breakpoint('sm')`
    max-width: 768px;
    flex-direction: row-reverse;
    margin: auto;
  `}
  ${breakpoint('md')`
    justify-content: flex-end;
  `}
`;

const HyperLink = styled.a`
  color: #fff;
  text-decoration: none;
  :hover {
    color:#fff;
    text-decoration: none;
    cursor: pointer;
  }
`;

export {
  FooterLogo,
  Label,
  PaymentOptionContainer,
  Div,
  NewFooterContainer,
  Container,
  NewCopyRightContainer,
  Dash,
  FooterImgContainer,
  FooterImg,
  ImgContainer,
  FooterContentContainer,
  FooterContent,
  SocialContainer,
  Social,
  MainFooterContainer,
  HyperLink
};
