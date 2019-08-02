import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const ModalContentWrapper = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 68px 38px 24px 38px;
  width: auto;

  ${breakpoint('md')`
    width: 554px;
    margin: 0px;
  `}
`;

const LoveLetterContainer = styled.div`
  margin: 38px 34px;
`;

const BrokenHeartImage = styled.img`
  position: absolute;
  width: 182px;
  left: 30%;
  top: -82px;
`;

const ModalFooterContainer = styled.div`
  text-align: right;
  margin-top: 40px;
`;

const P1 = styled.p`
  margin: 10px 0px;
`;

const modalStyles = width => ({
  overlay: {
    backgroundColor: '#3e3e3e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    zIndex: 999
  },
  content: {
    border: 'none',
    color: '#000',
    borderRadius: '10px',
    width: `${width}px`,
    position: 'relative',
    overflow: 'initial',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 0,
    margin: '0px 10px'
  }
});

export { LoveLetterContainer, BrokenHeartImage, ModalFooterContainer, P1, ModalContentWrapper, modalStyles };
