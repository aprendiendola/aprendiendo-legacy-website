import styled from 'styled-components';

const StyledInput = styled.input`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  font-size: 14px;
  padding: 12px 5px;
  width: 100%;
`;

export { StyledInput };
