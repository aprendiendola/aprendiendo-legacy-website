import styled from 'styled-components';
import blood from 'assets/images/blood.svg';
import blackTextureBg from 'assets/images/package-bg.png';
import breakpoint from 'styled-components-breakpoint';
import cyberM from 'assets/images/cyberm.svg';

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 rgba(#333333, 0);
  box-sizing: border-box;
  padding: 45px 25px 10px;
  max-width: 240px;
  position: relative;
  text-align: center;
  width: 100%;
  margin: 0 13px;
  border: 1px solid #ddd;
  margin-top: 20px;
  ${breakpoint('md')`
    margin-top: 0px;
  `} ${({ isFeatured }) => (isFeatured ? 'box-shadow: 0px 0px 69px -13px rgba(0,0,0,0.54);' : '')};
`;

const Header = styled.div`
  min-height: 66px;
  overflow: hidden;
`;

const Description = styled.div`
  margin-bottom: 25px;
`;

const DescriptionP = styled.p`
  line-height: 1.125;
  overflow: hidden;
  display: inline-block;
  max-height: 100px;
  font-size: 13px;
  color: #686868;
  font-weight: 600;
  width: 150px;
  text-overflow: ellipsis;
`;

const InfoP = styled.p`
  font-size: 14px;
  color: #686868;
  margin-top: 16px;
  line-height: 1.125;
`;

const Flag = styled.div`
  left: 0;
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
`;

const FlagSpan = styled.span`
  background: ${({ black }) => (black ? `url(${blackTextureBg})` : 'rgb(255, 109, 91)')};
  border-radius: 0 0 8px 8px;
  color: #ffffff;
  display: inline-block;
  font-weight: 600;
  line-height: 1;
  padding: 6px 34px;
  font-size: 16px;
`;

const BlackFridaySpan = styled.span`
  background: ${({ black }) => (black ? `url(${blackTextureBg})` : 'rgb(255, 109, 91)')};
  background-position: center;
  border-radius: 0 0 8px 8px;
  color: #ffffff;
  display: inline-block;
  line-height: 1;
  padding: 6px 14px;
  font-size: 14px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 800;
  text-shadow: 0 0 0px rgb(255, 255, 255), 0 0 2px rgb(255, 255, 255), 0 0 0px rgb(255, 255, 255),
    0 0 0px #fff, 0 0 0px #fff, 0 0 1px #fff, 0 0 0px #fff;
`;

const CyberText = styled.div`
  background: url(${cyberM});
  background-size: 120%;
  width: 110px;
  height: 14px;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h3`
  font-weight: bolder;
  font-size: 16px;
  color: #414042;
  line-height: 1.125;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Price = styled.div`
  margin-bottom: 10px;
  position: relative;
  height: 40px;
`;

const SalePrice = styled.span`
  display: block;
  color: #414042;
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
`;

const Discount = styled.p`
  position: absolute;
  top: -22px;
  width: 100%;
  margin-bottom: 10px;
`;

const DiscountSpan = styled.span`
  font-weight: bold;
  color: #07a1fb;
  font-size: 12px;
`;

const HalloweenDiscountSpan = styled.span`
  font-weight: bold;
  color: #e52323;
  font-size: 12px;
`;

const BeforeSpan = styled.span`
  color: #5a5a5a;
  font-size: 12px;
`;

const BeforePrice = styled.span`
  text-decoration: line-through;
`;

const More = styled.span`
  color: #07a1fb;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.15em;
`;

const CartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${({ grey, isFeatured, blackTexture }) => {
    let color = '#1c7ced';
    if (grey) color = '#f4f4f4';
    if (isFeatured) color = 'rgb(255, 109, 91)';
    if (isFeatured && blackTexture) color = `url(${blackTextureBg})`;
    return color;
  }};
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  border: none;
  border-radius: 60px;
  color: ${({ grey }) => (grey ? '#969696' : '#fff')};
  font-weight: bold;
  font-size: 14px;
  width: 180px;
  margin-bottom: 11px;
  cursor: pointer;
  height: 37px;
  :hover {
    background-color: ${({ buy, isFeatured, blackTexture }) => {
    if (buy) {
      if (isFeatured && blackTexture) return `url(${blackTextureBg})`;
      if (!isFeatured) return '#0fa3f4';
      return 'rgb(255, 131, 116)';
    }
    return '#f4f4f4';
  }};
  }
`;

const HalloweenCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${({ grey, isFeatured }) => {
    let color = '#1c7ced';
    if (grey) color = '#f4f4f4';
    if (isFeatured) color = '#e52323';
    return color;
  }};
  border: none;
  border-radius: 60px;
  color: ${({ grey }) => (grey ? '#969696' : '#fff')};
  font-weight: bold;
  font-size: 14px;
  width: 180px;
  margin-bottom: 11px;
  cursor: pointer;
  height: 37px;
  :hover {
    background-color: ${({ buy, isFeatured }) => (buy && !isFeatured ? '#0fa3f4' : buy && isFeatured ? '#f85854' : '#f4f4f4')};
  }
`;

const CartIcon = styled.img`
  width: 14px;
  margin-left: 5px;
  position: relative;
`;

const LessonsText = styled.small`
  font-size: 12px;
`;

export {
  Card,
  Header,
  Description,
  DescriptionP,
  InfoP,
  Flag,
  FlagSpan,
  Title,
  Price,
  SalePrice,
  Discount,
  DiscountSpan,
  More,
  CartButton,
  CartIcon,
  BeforePrice,
  BeforeSpan,
  LessonsText,
  BlackFridaySpan,
  CyberText
};
