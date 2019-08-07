import React, { Fragment } from 'react';
import Input from 'components/Input';
import { SectionTitle, NameContainer, FormLabel } from '../styles';

const constants = {
  LABEL_FIRST_NAME: 'Nombres',
  LABEL_LAST_NAME: 'Apellidos',
  LABEL_EMAIL: 'Correo',
  LABEL_PHONE_NUMBER: 'Número celular',
  LABEL_UNIVERSITY: 'Universidad',
};

const Data = ({ user: { user } }) => {
  console.log('user', user)
  return (
    <Fragment>
      <SectionTitle>
        Mis Datos
      </SectionTitle>
      <NameContainer>
        <div style={{ width: '100%', marginRight: '40px' }}>
          <FormLabel>{constants.LABEL_FIRST_NAME}</FormLabel>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder={constants.LABEL_FIRST_NAME}
            value={user.name}
            style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
            disabled
          />
        </div>
        <div style={{ width: '100%' }}>
          <FormLabel>{constants.LABEL_LAST_NAME}</FormLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder={constants.LABEL_LAST_NAME}
            value={user.last_name}
            style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
            disabled
          />
        </div>
      </NameContainer>
      <FormLabel>{constants.LABEL_EMAIL}</FormLabel>
      <Input
        id="email"
        name="email"
        type="text"
        placeholder={constants.LABEL_EMAIL}
        value={user.email}
        style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
        disabled
      />
      <FormLabel>{constants.LABEL_PHONE_NUMBER}</FormLabel>
      <Input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        placeholder={constants.LABEL_PHONE_NUMBER}
        value={user.phone}
        style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
        disabled
      />
      <FormLabel>{constants.LABEL_UNIVERSITY}</FormLabel>
      <Input
        id="university"
        name="university"
        type="text"
        placeholder={constants.LABEL_UNIVERSITY}
        value={user.university_shortname}
        style={{ maxWidth: '500px', border: '1px solid #DADADA' }}
        disabled
      />
    </Fragment>
  );
};

export default Data;
