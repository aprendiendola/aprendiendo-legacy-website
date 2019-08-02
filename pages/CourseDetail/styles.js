import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';


const ClassHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center
    `;

const SortContainer = styled.div`
    display: flex;
`;

const SortLabel = styled.label`
    margin-right:15px;
    font-size: 16px;
`;


export { ClassHeaderContainer, SortContainer, SortLabel };
