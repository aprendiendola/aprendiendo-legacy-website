import React from 'react';
import clockIcon from 'assets/images/icons/clock.svg';
import moment from 'moment';
import {
  BannerContainer, Banner, BannerText, Days
} from './styles';

const ComingSoonBanner = ({ releaseDate }) => {
  const date = moment(releaseDate);
  const days = date.diff(moment(new Date()), 'days');
  return (
    <BannerContainer>
      <Banner>
        <BannerText>
            Este curso estará disponible en
        </BannerText>
        <Days>
          <img src={clockIcon} alt="clock" width="22px" />
          {' '}
          <p style={{ marginLeft: '5px' }}>
            {days}
            {' '}
            días
          </p>
        </Days>
      </Banner>
    </BannerContainer>
  );
};
export default ComingSoonBanner;
