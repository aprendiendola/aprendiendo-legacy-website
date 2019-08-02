import React from 'react'
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ReferralLink from './ReferralLink';
import TotalReferrals from './TotalReferrals';

const GridContainer = styled.div`
    display: grid;
    color: #626262;
    ${breakpoint('sm')`
        grid-template-columns: 383px 135px;
        grid-column-gap: 20px;
    `}
`;

export default ({ link, totalReferrals }) => {
  return (
    <GridContainer>
        <div>
            <div style={{ padding: "10px 0px" }}>
                <p>Comparte este link a tus amigos</p>
            </div>
            <ReferralLink link={link} />
        </div>
        <div>
            <div style={{ padding: "10px 0px" }}>
                <p>Total de referidos</p>
            </div>
            <TotalReferrals total={totalReferrals} />
        </div>
    </GridContainer>
  )
}
