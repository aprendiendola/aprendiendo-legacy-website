import React, { Component } from 'react';
import { TitleSection } from 'components';
import loadSlider from 'utils/loadSlider';
import comercioLogo from 'assets/images/comercio-logo.svg';
import startupChileLogo from 'assets/images/startup-chile-logo.svg';
import startupPeruLogo from 'assets/images/startup-peru-logo.svg';
import utecVenturesLogo from 'assets/images/utec-ventures-logo.svg';
import wayraLogo from 'assets/images/wayra-logo.svg';
import {
  AwardsContainer,
  Container,
  Award
} from './styles';

class Awards extends Component {
  componentDidMount() {
    loadSlider({
      container: '.my-slider',
      items: 1,
      mouseDrag: true,
      loop: true,
      autoplay: true,
      slideBy: 1,
      controls: false,
      nav: true,
      gutter: 10,
      responsive: {
        768: {
          items: 3
        },
        1024: {
          items: 5,
          autoplay: false,
          mouseDrag: false,
        }
      }
    });
  }

  render() {
    return (
      <div style={{ padding: '0 20px' }}>
        <AwardsContainer>
          <TitleSection
            title="Premios y prensa"
            paddingTop="40px"
            color="#fff"
          />
          <Container>
            <div className="my-slider" style={{ display: 'flex' }}>
              <Award image={comercioLogo} />
              <Award image={startupChileLogo} />
              <Award image={startupPeruLogo} />
              <Award size="168px" image={utecVenturesLogo} />
              <Award image={wayraLogo} />
            </div>
          </Container>
        </AwardsContainer>
      </div>
    );
  }
}

export default Awards;
