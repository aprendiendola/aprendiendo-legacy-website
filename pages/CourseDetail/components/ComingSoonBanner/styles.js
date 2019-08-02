import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const BannerContainer = styled.div`
  width: 100%;
  ${breakpoint('sm')`
    margin-top: ${({ withMargin }) => (withMargin === true ? '158px' : '0px')};
    width: 100%;
  `}
`;

const Banner = styled.div`
  height: 70px;
  width: 100%;
  background: linear-gradient(45deg, rgb(145, 44, 234) 41%, rgb(182, 5, 255) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
`;

const BannerText = styled.div`
  color: #fff;
  font-weight: 800;
  font-size: 18px;
`;

const Days = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10px;
  background: #fff;
  color: #3ba2ef;
  font-weight: 800;
  font-size: 24px;
  padding: 2px 15px;
  border-radius: 3px;
`;

export {
  BannerContainer,
  Banner,
  BannerText,
  Days
};
