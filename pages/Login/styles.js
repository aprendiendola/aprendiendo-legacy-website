import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const LoginContainer = styled.div`
  padding: 20px 15px;
  ${breakpoint('sm')`
    padding: 30px;
  `}
`;

const LoginInner = styled.div`
  max-width: 360px;
  margin: auto;
`;

const LoginTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
  text-transform: uppercase;
  text-align: center;
  ${breakpoint('sm')`
    font-size: 20px;
  `}
`;

const SocialLoginSection = styled.div`
  border-bottom: solid ${({ theme }) => theme.color.greyLight} 1px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  width: 100%;
`;

const FacebookLogin = styled.div`
  width: calc(50% - 5px);
  ${breakpoint('sm')`
  width: calc(50% - 10px);
  `}
`;

const GoogleLogin = styled.div`
  width: calc(50% - 5px);
  ${breakpoint('sm')`
  width: calc(50% - 10px);
  `}
`;

const EmailLogin = styled.div`
  border-bottom: solid $grey-light 1px;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const EmailTitle = styled.h2`
  font-size: 14px;
  text-align: center;
`;

const RegisterSection = styled.div`
  text-align: center;
`;

export {
  LoginContainer,
  LoginInner,
  LoginTitle,
  SocialLoginSection,
  FacebookLogin,
  GoogleLogin,
  EmailLogin,
  EmailTitle,
  RegisterSection
};
