import React from 'react';
import { Name, SelectContainer, Selects, Container } from './styles';

const customStyles = {
  menuList: () => ({
    zIndex: 2,
    overflowY: 'auto',
    maxHeight: 320
  }),
}

const Select = ({
  name, onChange, onBlur, placeholder, options
}) => {
  return (
    <Container>
      <Name>{name}</Name>
      <SelectContainer>
        <Selects
          styles={customStyles}
          classNamePrefix="newSelect"
          noOptionsMessage={() => 'Sin datos'}
          name={name}
          onChange={onChange}
          maxMenuHeight="130"
          onBlur={() => {
            onBlur(name, true);
          }}
          placeholder={placeholder}
          menuPlacement="bottom"
          options={options}
        />
      </SelectContainer>
    </Container>
  );
};

export default Select;
