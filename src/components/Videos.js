import React from "react";
import YouTube from "react-youtube";
import data from "../data/data.json";

export default function Videos() {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      controls: 1,
      fs: 1,
      disablekb: 0,
    },
  };
  function _onReady(event) {
    event.target.pauseVideo();
  }
  return (
    <>
      <YouTube
        videoId={data[0].videos[0]}
        opts={opts}
        id={"yt"}
        onReady={_onReady}
      />
    </>
  );
}
