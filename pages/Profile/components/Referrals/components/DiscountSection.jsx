import React from 'react'
import ReferralTable from "./ReferralTable";

export default ({ referreds, applyDiscount, maxDiscountAllowed }) => {
  return (
    <div style={{ padding: '20px 0px' }}>
        <div style={{ maxWidth: 504 }}>
            <p style={{
                color: '#626262',
                fontSize: '16px',
                padding: '10px 0px'
                }}>
                Selecciona a tus referidos para sumar tu descuento.
            </p>
            <ReferralTable
                data={referreds}
                applyDiscount={applyDiscount}
                maxDiscountAllowed={maxDiscountAllowed}
            />
        </div>
    </div>
  )
}
