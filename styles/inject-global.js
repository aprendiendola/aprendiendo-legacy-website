import { css, createGlobalStyle } from 'styled-components';

const debug = require('debug')('landing:inject-global');

const sharedStyles = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-height: 0;
  min-width: 0;
`;

debug('Injecting %o', sharedStyles);

export default createGlobalStyle`
  * {
    ${sharedStyles}
    font-family: 'Lato', sans-serif;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: antialiased;
    -webkit-font-smoothing: antialiased;
    outline: none;
  }
  html, body {
    ${sharedStyles}
    width: 100%;
    height: auto;
    .ReactModal__Content {
      height: 100vh !important;
      width: 100vw !important;
      @media (min-width: 62em) {
        height: 560px !important;
        width: 900px !important;
      }
    }
  }
`;
