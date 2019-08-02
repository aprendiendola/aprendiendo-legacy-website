import React from 'react';
import {
  Container,
  CheckAndTextContainer,
  CheckContainer,
  Check,
  Text,
  Remove,
  Radio as TestRadio
} from './styles';

const Radio = ({ options, onChange, parentName }) => {
  return (
    <div className="container">
      {Array.isArray(options) && options.length > 0 && options.map((option, index) => {
        return (
          <Container>
            <TestRadio className="radio" key={index}>
              <input
                id={`radio-${index}-${parentName}`}
                name={parentName}
                type="radio"
                value={option.value}
                onChange={(e) => onChange({ name: option.name, value: e.target.value })}
              />
              <label htmlFor={`radio-${index}-${parentName}`} className="radio-label">
                {option.name}
              </label>
            </TestRadio>
            <Remove isClickable>
              Quitar
            </Remove>
          </Container>
        )
      })}
    </div>
  )
}

export default Radio;
