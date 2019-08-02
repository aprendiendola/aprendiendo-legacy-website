import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import whatsappLogo from 'assets/images/icons/whatsapp@2x.png'

const Container = styled.div`
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 0px 1px rgba(0, 0, 0, 0.05), 0 2px 3px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 50px;
  padding: 0 25px;
  position: relative;
  width: 100%;
  z-index: 2;
  justify-content: space-between;
`;

const WhatsappLogo = styled.div`
  background-image: url(${whatsappLogo});
  backround-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  width: 20px;
  height: 20px;
`;

const ContactContainer = styled.div`
  display: none;
  a {
    color: #000;
    font-weight: bold;
    font-size: 14px;
    margin-left: 5px;
  }
  ${breakpoint('lg')`
    display: flex;
  `}
`;

export {
  Container,
  ContactContainer,
  WhatsappLogo
};
