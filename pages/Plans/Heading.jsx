import React, { Fragment } from 'react';
import { Header } from './styles';
import { TitleSection } from 'components'

const Heading = ({ university }) => {
  return (
    <Header>
      <TitleSection
        paddingRight="10px"
        paddingLeft="10px"
        title={
          <Fragment>
            Elige el
            <b style={{ color: '#0fa3f4', fontWeight: '900', margin: '0 5px' }}>
              Plan Premium
            </b>
            que más te acomode
          </Fragment>
        }
        subTitle={university}
      />
    </Header>
  );
};

export default Heading;
