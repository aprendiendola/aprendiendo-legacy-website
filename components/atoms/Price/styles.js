import styled from "styled-components";
import { Label } from "components";

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: auto;
  margin-bottom: 7px;
`;

export const Price = styled(props => <Label {...props} />)`
  font-size: 54px;
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? "#fff" : "#414042")};
  position: relative;
  line-height: 0.9;
`;

export const MoneySymbol = styled(props => <Label {...props} />)`
  font-size: 28px;
  font-weight: 900;
  color: ${({ isFeatured }) => (isFeatured ? "#fff" : "#414042")};
  align-items: flex-start;
`;
