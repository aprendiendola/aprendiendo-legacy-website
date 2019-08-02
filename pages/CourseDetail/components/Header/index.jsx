import React from "react";
import Video from "components/Video";

import { Container, VideoWrapper, FloatingRightComponent } from "./styles";

export default function Header({ videoUrl, rightComponent }) {
  return (
    <div style={{ position: "relative" }}>
      <Container>
        <VideoWrapper>
          <Video videoUrl={videoUrl} />
        </VideoWrapper>
      </Container>
      <FloatingRightComponent>{rightComponent}</FloatingRightComponent>
    </div>
  );
}
