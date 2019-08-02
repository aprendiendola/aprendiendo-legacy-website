import React, { Fragment } from 'react';
import Help from './Help';
import { Header } from './styles';
import { Label, TitleSection } from 'components'

const Heading = ({ course, university, toggleHelperModal }) => {
  let universityValues = {};
  if (university) {
    universityValues = {
      color: university.data.color,
      name: university.data.name
    };
  }
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
        subTitle={universityValues.name}
      />
    </Header>
  );
};

export default Heading;
