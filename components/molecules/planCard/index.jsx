import React from 'react';
import { Label } from 'components';
import { PlanCardContainer, Header } from './styles';

const PlanCard = ({
  title, price, subtitle, isHighlight, children, backgroundSize, noStyle, noPrice
}) => {
  return (
    <PlanCardContainer noStyle={noStyle} backgroundSize={backgroundSize} isHighlight={isHighlight}>
      <Header style={noPrice ? { padding: '44px 15px', paddingBottom: isHighlight ? '60px' : '10px' } : {}} noStyle={noStyle} isHighlight={isHighlight}>
        {title && (
          <Label
            fontSize={isHighlight ? '32px' : '30px'}
            weight="black"
            align="center"
            color={isHighlight ? '#fff' : '#414042'}
            marginBottom="10px"
          >
            {title}
          </Label>
        )}
        {price && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Label
              fontSize={isHighlight ? '53px' : '44px'}
              weight="black"
              align="center"
              color={isHighlight ? '#fff' : '#414042'}
              style={{ position: 'relative' }}
            >
              <Label
                fontSize="26px"
                weight="black"
                align="center"
                color={isHighlight ? '#fff' : '#414042'}
                marginRight="10px"
                style={{ position: 'absolute', top: 0, left: '-25px' }}
              >
                S/
              </Label>
              {price}
              <Label
                color={isHighlight ? '#fff' : '#414042'}
                marginRight="10px"
                style={{
                  fontWeight: '500',
                  position: 'absolute',
                  right: '-53px',
                  top: isHighlight ? '28px' : '18px',
                  fontSize: '20px'
                }}
              >
                /mes
              </Label>
            </Label>
          </div>
        )}
        {subtitle && (
          <Label fontSize="19px" align="center" color={isHighlight ? '#fff' : '#414042'}>
            {subtitle}
          </Label>
        )}
      </Header>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '22px 25px 30px' }}>{children}</div>
    </PlanCardContainer>
  );
};

export default PlanCard;
