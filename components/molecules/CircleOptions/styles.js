import styled from 'styled-components';

const activeStyles = ({ theme, active }) =>
  active &&
  `
  background: ${theme.color.primary};
  color: ${theme.color.white};
  border: ${theme.color.primary};

  :hover {
    color: ${theme.color.white};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const CircleButton = styled.div`
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  display: inline-block;
  line-height: 30px;
  width: 33px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.color.primary};
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
  ${activeStyles}
`;

const Hint = styled.p`
  color: ${({ theme }) => theme.color.lightGrey};
`;

export { Container, CircleButton, Hint };
