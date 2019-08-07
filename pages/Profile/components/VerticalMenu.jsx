import React from 'react'
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Avatar from 'react-avatar';
import videoIcon from 'assets/images/icons/video@2x.png';
import rocketIcon from 'assets/images/rocket2.svg';
import cogIcon from 'assets/images/icons/cog.svg';
import referralIcon from 'assets/images/icons/referral_icon.svg';
import userIcon from 'assets/images/icons/user.svg';
import facebookPixel from 'utils/facebook';

const Container = styled.div`
    visibility: hidden;
    width: 0px;
    height: 0px;
    grid-area: sidebar;
    ${breakpoint('md')`
      font-weight: 600;
      font-size: '16px';
      visibility: visible;
      width: 21%;
      height: auto;
      padding: 20px 20px;
    `}
`;

const BoxItem = styled.div`
    display: flex;
    padding: 10px 0px;
    cursor: pointer;
    ${props => props.active && 'color: #0fa3f4;'}
`;

export default ({ user, setSelectedSection, activeTab }) => {
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          color={user.access_type === 'freemium' ?
            "linear-gradient(47deg, #4e87d0, #7edfb5)":
            "linear-gradient(47deg, #1A4292, #4267B2)"}
          textSizeRatio={1.75}
          name={`${user.name} ${user.last_name}`}
          src={user.avatar}
          round
          size="50"
        />
        <div style={{ marginLeft: 10, maxWidth: '120px', fontWeight: 900, color: '#626262' }}>
          <span>{`${user.name} ${user.last_name}`}</span>
        </div>
      </div>
      <div style={{ marginTop: 85 }}>
        <BoxItem
          onClick={() => setSelectedSection('cursos')}
          active={activeTab === 'cursos'}
        >
          <div style={{ width: 20, marginRight: 16 }}>
            <img src={videoIcon} alt="player" style={{ height: 14 }} />
          </div>
          {'Mis cursos'}
        </BoxItem>
        <BoxItem
          onClick={() => setSelectedSection('subscription')}
          active={activeTab === 'subscription'}
        >
          <div style={{ width: 20, marginRight: 16 }}>
            <img src={rocketIcon} alt="rocket" style={{ height: 14 }} />
          </div>
          {'Suscripción'}
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
          <div style={{ width: 20, marginRight: 16 }}>
            <img src={referralIcon} alt="cog" style={{ height: 14 }} />
          </div>
          {'Referidos'}
        </BoxItem>
        <BoxItem
          onClick={() => setSelectedSection('configuration')}
          active={activeTab === 'configuration'}
        >
          <div style={{ width: 20, marginRight: 16 }}>
            <img src={cogIcon} alt="cog" style={{ height: 14 }} />
          </div>
          {'Configuración'}
        </BoxItem>
        <BoxItem
          onClick={() => setSelectedSection('data')}
          active={activeTab === 'data'}
        >
          <div style={{ width: 20, marginRight: 16 }}>
            <img src={userIcon} alt="cog" style={{ height: 14 }} />
          </div>
          {'Mis datos'}
        </BoxItem>
      </div>
    </Container>
  )
}
