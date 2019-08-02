import React from 'react'
import listItemIcon from 'assets/images/list-item-icon.svg';

export default ({ maxDiscountAllowed }) => {
  return (
    <div style={{ padding: "25px 0px", color: '#626262', maxWidth: 566 }}>
        <h1 style={{ color: '#000', fontSize: '14px', fontWeight: 900, marginBottom: 5 }}>Condiciones</h1>
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 12, width: 15 }}>
            <img style={{ paddingBottom: 1 }} src={listItemIcon} alt="listicon" />
            </div>
            <div>Por cada referido que compre un plan a través de tu link te llevarás S/20 de descuento para tu próximo pago.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 12, width: 15 }}>
            <img style={{ paddingBottom: 1 }} src={listItemIcon} alt="listicon" />
            </div>
            <div>El descuento máximo aplicable por pago es de S/{maxDiscountAllowed}.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 12, width: 15 }}>
            <img style={{ paddingBottom: 1 }} src={listItemIcon} alt="listicon" />
            </div>
            <div>Si acumulas más de S/{maxDiscountAllowed} podrás usar el saldo restante para tu subsiguiente pago.</div>
        </div>
    </div>
  )
}
