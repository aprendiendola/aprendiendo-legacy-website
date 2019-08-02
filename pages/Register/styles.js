import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';


const SignContainer = styled.div`
height: 100%;
display: flex;
flex-direction: column-reverse;
justify-content: center;
align-content: center;
align-items: center;

${breakpoint('md')`
    flex-direction: row;
    max-height: 574px;
min-height: 574px;
`}

img{
        margin-right: 66px;
    }
`;

const FlyingGuy = styled.img`
    margin-right: 0;
    position: relative;
    top: 80px;
    display:none;
    ${breakpoint('sm')`
        display: flex;
        position: relative;
        top: 14px;
        width: 80%;
    `}

    ${breakpoint('md')`
        margin-right: 66px;
        position: initial;
        top: initial;
        width: initial;
  `}
`;

export { SignContainer, FlyingGuy };
