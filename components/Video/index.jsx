import React from "react";
import validate from "../../utils/validate";
import { Iframe } from "./styles";

const Video = ({ videoUrl }) => {
  return (
    <Iframe
      frameBorder="0"
      src={`https://player.vimeo.com/video/${validate(
        videoUrl || "https://vimeo.com/295273849"
      )}?autoplay=0&title=0&byline=0&portrait=0`}
    />
  );
};

export default Video;
