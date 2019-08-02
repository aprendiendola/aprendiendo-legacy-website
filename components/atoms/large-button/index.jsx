import styled from "styled-components";
import React from "react";
import breakpoint from "styled-components-breakpoint";

const largeStyles = "padding: 0px 42px; height: 35px;";
const outlinedStyles =
  "border: 1px solid #1178f2; color: #1178f2; background: transparent;";
const loadingStyles = "cursor: wait; background: #3ba2ef;";

const StyledButton = styled.button`
  cursor: pointer;
  background-color: #1178f2;
  border-radius: 25px;
  box-shadow: ${({ shadow }) =>
    shadow ? "0 3px 6px 0 rgba(0, 0, 0, 0.16)" : "0px"};
  color: #ffffff;
  font-family: Lato;
  font-size: 13px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 900;
  letter-spacing: normal;
  line-height: normal;
  mix-blend-mode: undefined;
  object-fit: contain;
  text-align: center;
  height: 31px;
  width: 100%;
  border: none;
  ${({ large }) => large && largeStyles}
  ${({ outlined }) => outlined && outlinedStyles}
  ${({ loading }) => loading && loadingStyles}

  ${breakpoint("xs")`
    font-size: 18px;
  `}
`;

const Button = ({
  handleClick,
  large,
  outlined,
  loading,
  children,
  style,
  type,
  shadow,
  disabled
}) => {
  return (
    <StyledButton
      disabled={loading}
      disabled={disabled}
      large={large}
      outlined={outlined}
      loading={loading}
      style={style}
      onClick={() => handleClick()}
      type={type}
      shadow={shadow}
    >
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  handleClick: () => {},
  type: "button"
};

export default Button;
