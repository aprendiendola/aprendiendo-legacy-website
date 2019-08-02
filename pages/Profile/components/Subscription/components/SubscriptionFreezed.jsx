import React from 'react';
import { Alert, LargeButton } from 'components';

const SuscriptionFreezed = ({ unfreezeDate, handleUnfreeze, loading }) => (
  <div>
    <Alert lightblue fontWeight="800" height={62}>
      Tu plan Premium ha sido congelado
    </Alert>
    <div style={{ marginBottom: '20px', color: '#626262' }}>
      <p style={{ margin: '10px 0px' }}>Tu plan premium se descongelará automaticamente el:</p>
      <strong style={{ margin: '10px 0px' }}>{unfreezeDate}</strong>
      <p style={{ margin: '10px 0px' }}>O puedes descongelarlo cuando quieras aquí:</p>
    </div>
    <LargeButton loading={loading} handleClick={handleUnfreeze} large>
      {loading ? 'Cargando...' : 'Descongelar'}
    </LargeButton>
  </div>
);

export default SuscriptionFreezed;
