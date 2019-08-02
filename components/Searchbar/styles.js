import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import checkbox from 'components/atoms/checkbox';

const CheckboxContainer = styled.div`
    position: absolute;
    right: 50px;
    height: 26px;
    display: none;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    color: #626262;
    padding-left: 10px;
    border-left: 1px solid #a5a2a2;
    top: 3px;
    ${breakpoint('sm')`
        display: flex;
    `}
    `;

const Checkbox = styled(checkbox)`
    position: relative;
    top: 2px;
    margin-right: 8px`;

const CheckboxLabel = styled.span`
    position: relative;
    bottom: 1px;`;

export { Checkbox, CheckboxContainer, CheckboxLabel };
