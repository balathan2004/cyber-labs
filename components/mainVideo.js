import style from "/styles/playlist.module.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { SmallCard, CommentList } from "./smallCards";
import SendData from "./sendData";
import { UserCred, NotificationProvider } from "@/pages/_app";

export default function MainVideo({
  videoData,
  currentVideo,
  changeVideoQuery,
  course_id,
  commentData,
  changeComment,
}) {
  const allVideos = videoData.videos;
  const currentVideoFilter = allVideos.filter(
    (ele) => ele.video_id == currentVideo
  );
  const [mainVideoData, setMainVideoData] = useState(currentVideoFilter[0]);
  const playListName = videoData.playlist_info.playlist_name;
  const [comment, setComment] = useState([]);
  const userData = useContext(UserCred);
  const commentArea = useRef();
  const [notify, setNotify] = useContext(NotificationProvider);

  const [activeIndex, setActiveIndex] = useState(
    allVideos.findIndex((ele) => ele.video_id == currentVideo)
  );
  console.log(activeIndex);
  const commentFetching = (event) => {
    var commentValue = event.target.value;
    setComment(commentValue);
  };

  const sendComment = async (event) => {
    event.preventDefault();
    var data = {
      video_id: currentVideo,
      course_id: course_id,
      comment: comment,
      comment_user: userData ? userData.displayName : "anonymous",
    };
    changeComment((prev) => [...prev, data]);
    const response = await SendData("video_action/add_comment", data);
    if (response.message) {
      commentArea.current.value = "";
      setNotify("Comment Added");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.main_video}>
        <div className={style.video}>
          <video
            src={mainVideoData.video_link}
            controls
            poster={mainVideoData.video_thumbnail}
          ></video>
        </div>
        <div className={style.video_details}>
          <h3 className={style.title}>{mainVideoData.video_title}</h3>
          <span>{mainVideoData.video_caption}</span>
        </div>
        <div className={style.comment}>
          <form className={style.commentBox} onSubmit={sendComment}>
            <textarea
              onChange={commentFetching}
              required
              ref={commentArea}
            ></textarea>
            <button>Comment</button>
          </form>
          <div className={style.comment_list}>
            {commentData.map((ele, index) => (
              <CommentList commentData={ele} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className={style.video_list}>
        {allVideos.map((singleVideoData, index) => {
          return (
            <SmallCard
              mainVideoData={mainVideoData}
              changeVideo={setMainVideoData}
              data={singleVideoData}
              key={index}
              index={index}
              isActive={index == activeIndex}
              setIsActive={setActiveIndex}
              changeVideoQuery={changeVideoQuery}
            />
          );
        })}
      </div>
    </div>
  );
}
