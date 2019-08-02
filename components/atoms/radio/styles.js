import styled from 'styled-components';
import Label from '../label';

const Radio = styled.div`
  margin: 0;
  display: flex;
  overflow: hidden;
  label {
    cursor: pointer;
  }
  input[type='radio'] {
    position: absolute;
    opacity: 0;
    z-index: 100;
    width: 400px;
    cursor: pointer;
    + .radio-label {
      font-size: 14px;
      color: #626262;
      display: flex;
      align-items: center;
      ::before {
        content: '';
        background: #fff;
        border-radius: 100%;
        border: 1px solid #d7d8d9;
        display: inline-block;
        width: 14px;
        height: 14px;
        position: relative;
        margin-right: 1em;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    :checked {
      + .radio-label {
        ::before {
          background-color: #00afef;
          border: 1px solid #d7d8d9;
          box-shadow: inset 0 0 0 2px #fff;
        }
      }
    }
    :focus {
      + .radio-label {
        ::before {
          outline: none;
          border-color: #d7d8d9;
        }
      }
    }
    :disabled {
      + .radio-label {
        ::before {
          box-shadow: inset 0 0 0 2px #f4f4f4;
          border-color: darken(#f4f4f4, 25%);
          background: darken(#f4f4f4, 25%);
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  width: 552px;
  height: 52px;
  border-radius: 2px;
  border: solid 1px #d1d3d4;
  background-color: #ffffff;
  padding: 16px 18px;
  justify-content: space-between;
  :hover {
    border: solid 1px #0fa3f4;
    cursor: pointer;
    label {
      display: block;
    }
  }
`;

const CheckAndTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  border: 1px solid #d1d3d4;
  margin-right: 5px;
`;

const Check = styled.div`
  background-color: #0fa3f4;
  width: 10px;
  height: 10px;
  border-radius: 100%;
`;

const Text = styled(props => <Label {...props} />)`
  color: #626262;
  font-size: 16px;
`;

const Remove = styled(props => <Label {...props} />)`
  font-size: 16px;
  cursor: pointer;
  display: none;
  color: #0fa3f4;
`;

export { Radio, Container, CheckAndTextContainer, CheckContainer, Check, Text, Remove };
