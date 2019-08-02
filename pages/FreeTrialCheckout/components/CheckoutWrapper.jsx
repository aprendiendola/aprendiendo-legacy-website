import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  margin: 0;
  border: 1px solid ${({ hasError }) => (hasError ? '#F6635A' : '#d1d3d4')};

  ${breakpoint('lg')`
    width: 450px;
    height: 400px;
    text-align: 'left';
    box-shadow: 'rgba(234, 233, 232, 0.74) 0px 3px 3px 2px';
    margin-right: 20px;
  `}
`;

const CheckoutWrapper = ({ children, hasError }) => {
  return <Container hasError={hasError}>{children}</Container>;
};

export default CheckoutWrapper;
