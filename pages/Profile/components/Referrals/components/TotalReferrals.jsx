import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    border: 1px solid #dadada;
    width: 100px;
    color: #626262;
    padding: 7px;
    text-align: center;
`;

export default ({ total }) => {
  return (
    <Container>
        {total}
    </Container>
  )
}
