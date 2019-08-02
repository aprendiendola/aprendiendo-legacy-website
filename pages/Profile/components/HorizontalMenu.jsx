import React from 'react'
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import videoIcon from 'assets/images/icons/video@2x.png';
import rocketIcon from 'assets/images/rocket2.svg';
import cogIcon from 'assets/images/icons/cog.svg';
import referralIcon from 'assets/images/icons/referral_icon.svg';
import facebookPixel from 'utils/facebook';

const Container = styled.div`
    display: flex;
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    font-weight: 600;
    font-size: '14px';
    justify-content: space-between;
    ${breakpoint('sm')`
      justify-content: space-around;
    `}
    ${breakpoint('md')`
        visibility: hidden;
        width: 0px;
        height: 0px;
    `}
`;

const BoxItem = styled.div`
    text-align: center;
    padding: 12px 10px;
    font-size: 12px;
    ${breakpoint('sm')`
        font-size: 14px;
    `}
    ${props => props.active && 'border-bottom: 4px solid #0fa3f4'}
`;

export default ({ setSelectedSection, activeTab }) => {
  return (
    <Container>
        <BoxItem
          onClick={() => setSelectedSection('cursos')}
          active={activeTab === 'cursos'}
        >
          <div>
              <img src={videoIcon} alt="player" style={{ height: 18 }} />
            </div>
          <div>
            {'Mis cursos'}
          </div>
        </BoxItem>
        <BoxItem
          onClick={() => setSelectedSection('subscription')}
          active={activeTab === 'subscription'}
        >
          <div>
              <img src={rocketIcon} alt="suscripcion" style={{ height: 18 }} />
            </div>
          <div>
            {'Suscripción'}
          </div>
        </BoxItem>
        <BoxItem
          onClick={() => {
            facebookPixel.referralTabSelected({
              status: true
            });
            setSelectedSection('referrals');
          }}
          active={activeTab === 'referrals'}
        >
          <div>
              <img src={referralIcon} alt="referrals" style={{ height: 18 }} />
            </div>
          <div>
            {'Referidos'}
          </div>
        </BoxItem>
        <BoxItem
          onClick={() => setSelectedSection('configuration')}
          active={activeTab === 'configuration'}
        >
          <div>
              <img src={cogIcon} alt="config" style={{ height: 18 }} />
            </div>
          <div>
            {'Configuración'}
          </div>
        </BoxItem>
      </Container>
  )
}
