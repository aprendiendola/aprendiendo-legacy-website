import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  ${breakpoint("sm")`
    flex-direction: row;
    width: 860px;
    margin-top: 30px;
  `}
`;

export { Container, Wrapper };
