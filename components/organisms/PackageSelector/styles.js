import styled from "styled-components";
import { Label } from "components";

export const MainTitle = styled(props => <Label {...props} />)`
  display: flex;
  font-size: 30px;
  font-weight: 900;
  margin: 15px auto;
  color: ${({ isFeatured }) => (isFeatured ? "#fff" : "#414042")};
`;
