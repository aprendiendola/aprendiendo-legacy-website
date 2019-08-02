import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Select from 'react-select';
import Label from '../label';

const Name = styled(props => <Label {...props} />)`
  font-size: 12px;
  font-weight: 900;
  color: #626262;
  margin-bottom: 3px;
  ${breakpoint('md')`
    font-size: 14px;
    margin-bottom: 5px;
  `}
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  padding: 1px;
  position: relative;
`;

const Selects = styled(Select)`
  width: 100%;
  .newSelect__control {
    border: none;
    box-shadow: none;
    cursor: pointer;
  }
`;

const Container = styled(props => <Label {...props} />)`
  display: flex;
  flex-direction: column;
  min-width: 208px;
  ${breakpoint('md')`
    min-width: 250px;
  `}
`;

export {
  Container,
  Name,
  SelectContainer,
  Selects
};
