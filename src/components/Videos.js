/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { GiPlayButton } from "react-icons/gi";
import { firstValueFrom } from "rxjs";
import data from "../data/data.json";
import { parseYoutubeUrl, getVideoData$ } from "../utils";
import "../styling/videos.css";

export default function Videos(props) {
  const { video_id, color, theme } = props;
  const youtubePlayerRef = useRef(null);
  const playerRef = useRef(null);
  const [videoData, setVideoData] = useState({});
  const [activeVideo, setActiveVideo] = useState("");
  const [focusVideo, setFocusVideo] = useState(video_id[0]);
  const [activeThumbnailImage, setActiveThumbnailImage] = useState(
    thumbnail(video_id[0]),
  );
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      controls: 1,
      fs: 1,
      disablekb: 0,
      autoplay: 1,
    },
  };
  const onPlayerReady = (event) => {
    youtubePlayerRef.current = event.target;
    const iframe = document.querySelector(".youtube_iframe");
    if (iframe?.parentElement) {
      iframe.parentElement.style.width = "100%";
    }
    // document.querySelector(".youtube_iframe").parentElement.style.height = "100%";
  };

  function handleClick() {
    playerRef.current.style.display = "none";
    document.querySelector("#yt").style.display = "flex";
    setActiveVideo(focusVideo);
    youtubePlayerRef.current?.playVideo?.();
  }
  function handle_thumb(video) {
    getVideoDataFromUrl(`https://www.youtube.com/embed/${video}`);
    setActiveThumbnailImage(thumbnail(video));
    setFocusVideo(video);
    youtubePlayerRef.current?.target?.pauseVideo?.();
    document.querySelector("#yt").style.display = "none";
    playerRef.current.style.display = "flex";
    youtubePlayerRef.current?.pauseVideo?.();
  }
  function thumbnail(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  async function getVideoDataFromUrl(url) {
    const videoId = parseYoutubeUrl(url);
    if (!videoId) return false;
    let data = await firstValueFrom(getVideoData$(videoId));
    setVideoData(data);
  }

  useEffect(() => {
    getVideoDataFromUrl(`https://www.youtube.com/embed/${video_id[0]}`);
    setActiveThumbnailImage(thumbnail(video_id[0]));
    setFocusVideo(video_id[0])
    setActiveVideo("")
    document.querySelector("#yt").style.display = "none";
    playerRef.current.style.display = "flex";
  }, [video_id]);

  return (
    <section className="humanoid_videos_section">
      <figure className="youtube_player_container">
        <button className="video_button" onClick={handleClick} ref={playerRef}>
          <img
            className="video_thumbnail"
            src={activeThumbnailImage}
            alt={`${data[0].name} 1`}
          />
          <div className="play_button" style={{ backgroundColor: color }}>
            <GiPlayButton color="white" className="gip-play-button" />
          </div>
        </button>
        <div id={"yt"}>
          <YouTube
            videoId={activeVideo}
            opts={opts}
            iframeClassName={"youtube_iframe"}
            onReady={onPlayerReady}
          />
        </div>
        <figcaption>
          <span className="caption">{videoData?.title || ""}</span>
        </figcaption>
      </figure>
      <div className="video_otptions">
        <h3 className="more_videos_label" style={{color: color}}>MORE VIDEOS</h3>
        <div className="thumbs">
          <div className="thumb_scroller">
            {video_id.slice(1).map((video, i) => (
              <button
                className="scroller_button"
                key={`scroller_button_${i}`}
                onClick={() => handle_thumb(video)}
                css={css({
                  ":hover .video_thumbnail": {
                    border: `5px solid ${theme.text}`
                  }
                })}
              >
                <img
                  className="video_thumbnail"
                  src={thumbnail(video)}
                  alt={`${data[0].name} 1`}
                  style={{ border: focusVideo === video ? `5px solid ${color}` : ""}}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
