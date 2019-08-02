import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 10px auto;
`;

const Line = styled.div`
  background: linear-gradient(to bottom, #4e87d0, #7edfb5);
`;

const Header = styled.div`
  color: #00ACF0;
  font-weight: 900;
`;

const Comment = styled.div`
  color: #626262;
  margin: 10px 0px;
`;

const Content = styled.div`
  padding: 15px 20px;
  border: 1px solid #d1d3d4;
  border-left: none;
`;

const Title = styled.div`
  font-weight: 900;
`;

const Subtitle = styled.div`
  color: #c1c2c3;
  font-weight: 600;
`;

export default function Review({
  userName,
  userUniversity,
  comment
}) {
  return (
    <Container>
      <Line />
      <Content>
        <Header>
          <Title>{userName}</Title>
          <Subtitle>{userUniversity}</Subtitle>
        </Header>
        <Comment>
          <p>"{comment}"</p>
        </Comment>
      </Content>
    </Container>
  )
}
