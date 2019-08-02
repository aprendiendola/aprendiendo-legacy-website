import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const AwardsContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 341px;
  border-radius: 10px;
  background-color: #626262;
  margin: 60px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
  ${breakpoint('sm')`
    max-width: 700px;
  `}
  ${breakpoint('md')`
    max-width: 1220px;
  `}
`;

const Container = styled.div`
  display: flex;
  padding: 40px 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
  .tns-outer {
    width: 279px;
    button {
      display: none;
    }
  }
  .tns-nav {
    display: none;
  }
  .tns-liveregion {
    display: none;
  }
  ${breakpoint('sm')`
    padding: 5px 40px 28px 40px;
    .tns-outer {
      width: 715px;
    }
  `}
  ${breakpoint('md')`
    .tns-outer {
      width: 1280px;
    }
  `}
`;

const Award = styled.div`
  display: flex;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-size: 180px auto;
  background-repeat: no-repeat;
  width: 120px;
  height: 80px;
  ${breakpoint('sm')`
    background-size: ${({ size }) => size || '120px'} auto;
    width: 120px;
    height: 80px;
  `}
`;

export {
  AwardsContainer,
  Container,
  Award
};
