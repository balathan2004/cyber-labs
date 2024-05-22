import style from "/styles/playlist.module.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { SmallCard, CommentList } from "./smallCards";
import SendData from "./sendData";
import { v4 } from "uuid";
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
  const [height, setHeight] = useState("auto");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [activeIndex, setActiveIndex] = useState(
    allVideos.findIndex((ele) => ele.video_id == currentVideo)
  );

  const handleToggler = () => {
    setShowCommentBox((prev) => !prev);
  };

  const clearTextArea = () => {
    commentArea.current.value = "";
  };

  const commentFetching = (event) => {
    var commentValue = event.target.value;
    setHeight("auto"); // Reset height to auto to recalculate the height based on content
    setHeight(event.target.scrollHeight + "px");
    console.log(event.target.scrollHeight);
    setComment(commentValue);
  };

  const sendComment = async (event) => {
    event.preventDefault();
    var data = {
      video_id: currentVideo,
      course_id: course_id,
      comment: comment,
      comment_id: v4(),
      comment_user: userData ? userData.username : "anonymous",
    };
    changeComment((prev) => [...prev, data]);
    const response = await SendData("video_action/add_comment", data);
    if (response.message) {
      commentArea.current.value = "";
      setNotify("Comment Added");
      setHeight("40px");
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
            <span>Leave a Comment</span>
            <textarea
              onChange={commentFetching}
              required
              ref={commentArea}
              style={{ height }}
              placeholder="Add your comment"
            ></textarea>
            <button type="submit">Comment</button>
            <button type="button" onClick={clearTextArea}>
              Cancel
            </button>
          </form>
          <span className={style.toggler} onClick={handleToggler}>
            {!showCommentBox ? "Show Comments" : "Hide Comments"}
          </span>
          <div
            className={
              showCommentBox ? style.comment_list_show : style.comment_list
            }
          >
            {commentData.map((ele, index) => (
              <CommentList
                commentData={ele}
                key={index}
                userData={userData}
                setNotify={setNotify}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={style.white_box}>
        <div className={style.line1}>
          <p>{playListName.toUpperCase()}</p>
          <p>Rational Cyberlabs</p>
          <span>{allVideos.length} videos</span>

          <hr></hr>
        </div>
        <div className={style.boxes}>
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
    </div>
  );
}
