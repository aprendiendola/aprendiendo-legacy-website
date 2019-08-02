import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

const Container = styled.div`
  background-color: #414042;
`;

const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  height: 240px;
  ${breakpoint("sm")`
    height: 300px;
  `};
  ${breakpoint("md")`
    height: 320px;
    width: 65%;
  `};
  ${breakpoint("lg")`
    height: 340px;
  `};
`;

const FloatingRightComponent = styled.div`
  width: 100%;
  height: 100%;
  position: initial;
  ${breakpoint("sm")`
    right: 8%;
  `};
  ${breakpoint("md")`
    visibility: visible;
    width: auto;
    height: auto;
    position: absolute;
    top: -12px;
    right: 9%;
    z-index: 1;
  `};
  ${breakpoint("lg")`
    right: 15%;
  `};
  ${breakpoint("xl")`
    right: 25%;
  `};
`;

export { Container, VideoWrapper, FloatingRightComponent };
