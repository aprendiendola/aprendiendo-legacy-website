import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

const VideoContainer = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const Video = styled.iframe`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const ForbiddenDeviceContainer = styled.div`
  height: 93%;
  padding: 27px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${breakpoint("md")`
    padding: 0px;
  `};
`;

const ForbiddenDeviceContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 9px;
  align-items: center;
  border-radius: 5px;
  color: #fff;
  display: flex;
  background-color: #0979f1;
  font-size: 14px;
  font-weight: bold;
  border: none;
  justify-content: center;
  margin-right: 10px;
  width: 118px;
  height: 34px;
  cursor: pointer;
`;

const Text = styled.p`
  color: ${({ color }) => color || "#fff"};
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  ${breakpoint("md")`
    line-height: 43px;
  `};
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${({ color }) => color || "#fff"};
  font-size: 14px;
  text-align: center;
`;

const TeacherContact = styled.div`
  position: absolute;
  right: 0;
  background: #fff;
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.08);
  border-radius: 52px;
  z-index: 1;
  display: flex;
  opacity: ${({ active }) => (active ? "1" : "0")};
  width: ${({ active }) => (active ? "233px" : "32px")};
  height: 34px;
  margin: 14px 21px;
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  transition: all 0.5s;
  ${breakpoint("md")`
opacity: 1;
`};
`;

const TeacherContactText = styled.label`
  padding-left: 18px;
  min-width: 248px;
  cursor: pointer;
  opacity: 0;
  font-size: 14px;
  color: #424242;
  font-weight: 700;
`;

const TeacherCircleIcon = styled.div`
  opacity: ${({ active }) => (active ? "1" : "0.5")};
  transition: opacity 0.5s;
  height: 36px;
  background: #1278f2;
  width: 36px;
  color: #fff;
  border-radius: 52px;
  position: absolute;
  right: 20px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  margin: 13px 0px;
  justify-content: center;
  ${breakpoint("md")`
transition: all .5s ease;
  img{
    width:5px;
  }
  opacity: 1;
  :hover{
    transform: scale(1.2);
  }
`};
`;

export {
  Video,
  TeacherContactText,
  TeacherCircleIcon,
  VideoContainer,
  Subtitle,
  ForbiddenDeviceContainer,
  ForbiddenDeviceContent,
  Button,
  Text,
  TeacherContact
};
