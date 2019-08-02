import styled from 'styled-components';

const StepContainer = styled.div`
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  padding: 30px 20px 20px 20px;
  margin-top: 10px;
  border-radius: 3px;
  position: relative;
`;

const StepTag = styled.div`
  position: absolute;
  top: 0px;
  font-size: 14px;
  font-weight: bold;
  background: #bbb;
  padding: 3px 7px;
  color: #fff;
  border-radius: 2px;
  left: 0px;
`;

const StepText = styled.p`
  font-size: 14px;
  color: #686868;
  text-align: left;
  font-weight: 500;
  .number {
    color: #01c4a4;
    font-size: 20px;
    margin: 0px;
    padding: 0px;
    background: transparent;
    font-weight: bold;
  }
  .whatsapp {
    color: #01c4a4;
  }
  p {
    margin: 9px 0px;
  }
`;

const QRContainer = styled.div`
  width: 100%;
`;

const QrImage = styled.img`
  width: 115px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`;

export {
  StepContainer, Step, StepTag, StepText, QRContainer, QrImage, ButtonContainer
};
