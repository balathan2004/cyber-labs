import style from "/styles/playlist.module.css";
import React, { useState } from "react";

export function SmallCard({
  mainVideoData,
  data,
  index,
  isActive,
  changeVideo,
  changeVideoQuery,
  setIsActive,
}) {
  const videoChanger = () => {
    setIsActive(index);
    changeVideo(data);
    changeVideoQuery(data.video_id);
  };

  return (
    <div className={!isActive ? style.video_list_item : style.active_video}>
      <div className={style.vid} onClick={videoChanger}>
        <h1></h1>
        <img src={data.video_thumbnail}></img>
        <span>
          {index + 1 + " "}
          {data.video_title}
        </span>
      </div>
    </div>
  );
}

export function CommentList({ commentData }) {
  return (
    <div className={style.comment_item}>
      <div className={style.left}>
        <img></img>
      </div>
      <div className={style.right}>
        <span>{commentData.comment_user}</span>
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
}
