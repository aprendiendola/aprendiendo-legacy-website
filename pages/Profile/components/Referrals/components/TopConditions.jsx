import React from 'react'
import listItemIcon from 'assets/images/list-item-icon.svg';

export default () => {
  return (
    <div style={{ paddingBottom: 25, color: '#626262' }}>
        <p style={{ marginBottom: 10 }}>Paga menos invitando a tus amigos y obtén un descuento en tu próximo pago.</p>
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 12, width: 15 }}>
            <img style={{ paddingBottom: 1 }} src={listItemIcon} alt="listicon" />
            </div>
            <div>Si ya eres Premium, el descuento lo puedes aplicar en tu próximo pago.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 12, width: 15 }}>
            <img style={{ paddingBottom: 1 }} src={listItemIcon} alt="listicon" />
            </div>
            <div>Si aún no eres Premium, el descuento lo aplicarás en tu primera compra.</div>
        </div>
    </div>
  )
}
