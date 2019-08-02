import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.grey};
  margin: auto;
  position: relative;
  width: 286px;

  ${breakpoint('md')`
  width: 450px;
  `}
`;

const ModalTitle = styled.div`
  align-items: center;
  background: $grey-light;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  font-size: 16px;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  padding: 28px 15px 9px;
  text-align: center;

  ${breakpoint('md')`
  font-size: 20px;
  `}
`;

const TitleLabel = styled.span`
  font-weight: 800;
`;

const ModalTitleLabel = styled.span`
  font-weight: 800;
`;

const ModalSubtitleLabel = styled.span`
  font-size: 12px;
  font-weight: normal;

  ${breakpoint('md')`
font-size: 14px
`}
`;

const CloseModal = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  right: 17px;
  top: 17px;
  width: 14px;
  z-index: 1;
`;

const ModalBody = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 165px;
  justify-content: center;
  padding: 0 25px;
  text-align: center;

  ${breakpoint('md')`
  font-size: 14px;
  padding: 0 90px;
`}

  span {
    margin-top: 25px;
  }
`;

const ModalButtonWrapper = styled.div`
  width: 170px;
  padding-top: 20px;
  margin-bottom: 42px;
`;

export {
  ModalContent,
  ModalTitle,
  ModalSubtitleLabel,
  TitleLabel,
  ModalTitleLabel,
  CloseModal,
  ModalBody,
  ModalButtonWrapper
};
