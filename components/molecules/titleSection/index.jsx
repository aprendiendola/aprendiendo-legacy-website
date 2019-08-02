/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { prop, ifProp } from "styled-tools";
import { Dash, Label } from "components";

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  height: auto;
  width: 100%;
  padding-top: ${ifProp("paddingTop", prop("paddingTop"), "0px")};
  padding-bottom: ${ifProp("paddingBottom", prop("paddingBottom"), "15px")};
  padding-left: ${ifProp("paddingLeft", prop("paddingLeft"), "0px")};
  padding-right: ${ifProp("paddingRight", prop("paddingRight"), "0px")};
  justify-content: center;
  flex-direction: column;
  ${breakpoint("md")`
    align-content: center;
  `}
`;

const CustomTitleLabel = styled(props => <Label {...props} />)`
  font-size: 26px;
  margin-bottom: 10px;
  color: ${ifProp("color", prop("color"), "#414042")};
  flex-wrap: wrap;
  justify-content: center;
  ${breakpoint("sm")`
    font-size: 26px;
  `}
  ${breakpoint("md")`
    font-size: 33px;
  `}
  ${breakpoint("lg")`
    font-size: ${prop("fontSize")};
  `}
`;

const CustomSubtitleLabel = styled(props => <Label {...props} />)`
  font-size: 20px;
  ${breakpoint("lg")`
    font-size: ${prop("fontSize")};
  `}
`;

const ExperimentSubtitleLabel = styled(props => <Label {...props} />)`
  font-size: 34px;
  line-height: 30px;
  padding-bottom: 26px;
  line-height: initial;
  ${breakpoint("md")`
    font-size: ${prop("fontSize")};
  `}
  ${breakpoint("lg")`
    font-size: ${prop("fontSize")};
  `}
`;

const ExtraTitleContainer = styled.div`
  align-items: ${({ centerOnMobile, right }) => {
    if (centerOnMobile) return "center";
    if (right) return "flex-end";
    return "flex-start";
  }};
  display: flex;
  height: auto;
  width: auto;
  padding-top: ${ifProp("paddingTop", prop("paddingTop"), "0px")};
  padding-bottom: ${ifProp("paddingBottom", prop("paddingBottom"), "15px")};
  padding-left: ${ifProp("paddingLeft", prop("paddingLeft"), "0px")};
  padding-right: ${ifProp("paddingRight", prop("paddingRight"), "0px")};
  justify-content: ${ifProp("right", "right", "flex-end")};
  flex-direction: column;
  z-index: 1;
  ${breakpoint("sm")`
    text-align: ${ifProp(
      "right",
      "right",
      ifProp("centerOnTablet", "center", "left")
    )};
  `}
  ${breakpoint("md")`
    align-content: ${ifProp("right", "right", "left")};
    align-items: ${ifProp("right", "flex-end", "flex-start")};
  }};
  
    `}
`;

const ExtraTitle = styled(props => <Label {...props} />)`
  font-size: ${({ fontSizeMobile }) => fontSizeMobile || "44px"};
  margin-bottom: 10px;
  max-width: 307px;
  text-align: ${ifProp(
    "right",
    "right",
    ifProp("centerOnMobile", "center", "left")
  )};
  ${breakpoint("sm")`
    text-align: ${ifProp(
      "centerOnTablet",
      "center",
      ifProp("right", "right", "left")
    )};
  `}
  ${breakpoint("md")`
    font-size: 44px;
    text-align: ${ifProp("right", "right", "left")};
  `}
`;

const showExtraSubtitle = extraSubtitle => {
  if (!extraSubtitle) {
    return;
  }

  return (
    <ExperimentSubtitleLabel
      weight="black"
      textAlign="center"
      fontSize="53px"
      color="#414042"
      paddingBottom="17px"
    >
      {extraSubtitle}
    </ExperimentSubtitleLabel>
  );
};

const TitleSection = props => {
  const {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor,
    title,
    subTitle,
    extraSubtitle,
    extraTitle,
    weightSubTitle,
    right,
    center,
    color,
    style,
    noDash,
    centerOnMobile,
    centerOnTablet,
    fontSizeMobile,
    textAlign,
    titleFontSize,
    dashBorderSize,
    dashBorderWidth,
    dashPosition
  } = props;
  if (extraTitle) {
    return (
      <ExtraTitleContainer
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        backgroundColor={backgroundColor}
        right={right}
        centerOnMobile={centerOnMobile}
        centerOnTablet={centerOnTablet}
      >
        <ExtraTitle
          fontSizeMobile={fontSizeMobile}
          right={right}
          center={center}
          weight="black"
          color={color || "#414042"}
          style={style}
          centerOnMobile={centerOnMobile}
          centerOnTablet={centerOnTablet}
        >
          {title}
        </ExtraTitle>
        {!noDash && <Dash color={color} />}
      </ExtraTitleContainer>
    );
  }
  return (
    <StyledContainer
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      backgroundColor={backgroundColor}
    >
      {title && (
        <CustomTitleLabel
          textAlign={textAlign || "center"}
          fontSize={titleFontSize || "24px"}
          weight="black"
          color={color}
        >
          {title}
        </CustomTitleLabel>
      )}
      {showExtraSubtitle(extraSubtitle)}
      {subTitle && (
        <CustomSubtitleLabel
          weight={weightSubTitle}
          textAlign="center"
          fontSize="20px"
          color="#626262"
          paddingBottom="17px"
        >
          {subTitle}
        </CustomSubtitleLabel>
      )}
      {!noDash && (
        <div
          style={{
            display: "flex",
            justifyContent: dashPosition || "center",
            width: "100%"
          }}
        >
          <Dash
            color={color}
            borderSize={dashBorderSize || "3px"}
            borderWidth={dashBorderWidth || "60px"}
          />
        </div>
      )}
    </StyledContainer>
  );
};

TitleSection.style = StyledContainer;

export default TitleSection;
