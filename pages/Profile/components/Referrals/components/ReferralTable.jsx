import React from 'react'
import styled from 'styled-components';
import { Checkbox, LargeButton } from 'components';
import Swal from 'sweetalert2';

const StyledCheckbox = styled(Checkbox)`
    position: relative;
    top: 2px;
    margin-right: 8px`;

const CheckboxContainer = styled.div`
    height: 26px;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    color: #626262;
    display: flex;
`;

const Row = ({ item, checked, onToggle }) => {
    return (
        <div
            style={{
                border: '1px solid #dadada',
                padding: '8px',
                display: 'grid',
                gridTemplateColumns: '7% 63% 21% 10%',
                background: '#fcfcfc',
                borderTop: 'none',
                cursor: item.is_subscribed ? 'pointer' : 'not-allowed'
            }}
            onClick={() => item.is_subscribed ? onToggle(item.referred_data.id) : Swal.fire({
                title: 'Este usuario solo se registró',
                text: 'Tu amigo aún no compra una suscripción.',
                type: 'info',
                showCloseButton: true,
                grow: true
              })}
        >
            <CheckboxContainer>
                <StyledCheckbox onChange={() => {}} checked={checked} />
            </CheckboxContainer>
            <div>
                {`${item.referred_data.name} ${item.referred_data.last_name}`}
            </div>
            <div>
                {item.is_subscribed ? 'Compró' : 'Se registró'}
            </div>
            <div>
                {item.is_subscribed ? 'S/20' : 'S/0'}
            </div>
        </div>
    );
}

export default class ReferralTable extends React.Component {
    state = {
        selectedIds: []
    }

    handleToggle = id => {
        const { selectedIds } = this.state;
        const foundId = selectedIds.includes(id);
        if (!foundId) {
            this.setState({
                selectedIds: [...selectedIds, id]
            })
        } else {
            this.setState({
                selectedIds: selectedIds.filter(e => e !== id)
            })
        }
    }

    render() {
        const { selectedIds } = this.state;
        const { data, applyDiscount, maxDiscountAllowed } = this.props;

        const buttonDisabled = selectedIds.length <= 0;

        return (
            <div>
                <div style={{ color: '#626262', borderTop: '1px solid #dadada' }}>
                {
                    data.map(e => {
                        return (<Row
                            key={e.referred_data.id}
                            item={e}
                            checked={selectedIds.includes(e.referred_data.id)}
                            onToggle={this.handleToggle}
                            />)
                    })
                }
                </div>
                <div style={{ color: '#626262', padding: '15px 28px', display: 'flex', justifyContent: 'flex-end'}}>
                    <div>Tu descuento</div>
                    <div style={{ marginLeft: 15, fontWeight: 600 }}>S/{selectedIds.length * 20}</div>
                </div>
                <div style={{ padding: '15px 0px', display: 'flex', justifyContent: 'flex-end'}}>
                    <LargeButton
                        large
                        style={{
                            fontSize: '14px',
                            background: buttonDisabled ? '#d1d3d4' : '#1178f2',
                            cursor: buttonDisabled ? 'not-allowed' : 'pointer'
                        }}
                        handleClick={() => {
                            const totalReferrals = selectedIds.length;
                            const totalAmount = totalReferrals * 20;

                            if (totalAmount > maxDiscountAllowed) {
                                Swal.fire({
                                    title: 'Se superó el límite',
                                    text: `Solo puedes aplicar un máximo de S/${maxDiscountAllowed}. Quita un elemento de la lista.`,
                                    type: 'info',
                                    showCloseButton: true,
                                    grow: true
                                })
                            } else {
                                applyDiscount(selectedIds)
                            }
                        }}
                        disabled={buttonDisabled}
                        shadow={false}
                    >
                        Aplicar
                    </LargeButton>
                </div>
            </div>
          );
    }  
};
