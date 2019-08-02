import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 23px;
  ${breakpoint('md')`
    flex-direction: row;
    align-items: flex-start;
  `};
`;

const DescriptionAndFeedbackContainer = styled.div`
  display: flex;
  max-width: 948px;
  flex-direction: column;
  width: 100%;
  padding-right: 20px;
`;

const ToggleSwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  p {
    color: #fff;
    margin-right: 18px;
    font-family: Lato;
    font-size: 12px;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 21px;
  height: 13px;
  border: 1px solid #6d6e71;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  input {
    display: none;
  }
  div {
    position: absolute;
    border-radius: 50%;
    background-color: #dfdfdf;
    transition: 0.1s ease;
    width: 9px;
    height: 9px;
    top: 1px;
    left: 1px;
  }
  input:checked + div {
    left: 50%;
    background-color: #2693e6;
  }
`;

const TopVideoMenuContainer = styled.div`
display: flex;
max-height: 70px;
height: auto;
margin: 11px 0 16px 0;
align-items: flex-start;
justify-content: space-between;
 h3{
  color: #fff;
  font-weight: 900;
  font-size: 16px;
 }`;

export {
  ContentSection,
  DescriptionAndFeedbackContainer,
  ToggleSwitchContainer,
  ToggleSwitch,
  TopVideoMenuContainer
};
