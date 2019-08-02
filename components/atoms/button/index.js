import styled from 'styled-components';

const ButtonContainer = styled.button`
  display: flex;
  border-style: none;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height || '47px'};
  min-width: 286px;
  background: ${({ theme }) => theme.color.secondary};
  transition: background 0.1s ease-in-out;
  border-radius: 24px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  text-decoration: none;
  padding: 10px 62px;
  width: max-content;
  z-index: 1;
  :hover {
    cursor: pointer;
  }
  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export default ButtonContainer;
