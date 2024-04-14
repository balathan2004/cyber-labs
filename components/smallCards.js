import style from "/styles/playlist.module.css";
import moment from "moment";
import React, { useState, useRef } from "react";
import SendData from "./sendData";

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
    <div
      className={isActive ? style.selected_box : style.box}
      onClick={videoChanger}
    >
      <h1></h1>
      <img src={data.video_thumbnail}></img>
      <span></span>
      <div className={style.box1_text}>
        <p>
          {index + 1 + " "}
          {data.video_title}
        </p>
        <span>{data.video_caption}</span>
      </div>
    </div>
  );
}

export function CommentList({ commentData, userData, setNotify }) {
  console.log(commentData);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const showBox = () => {
    setShowReplyBox(true);
  };

  const hideBox = () => {
    setShowReplyBox(false);
  };
  return (
    <div className={style.comment_item}>
      <div className={style.left}>
        <img></img>
      </div>
      <div className={style.right}>
        <span>{commentData.comment_user}</span>
        <p>{commentData.comment}</p>
      </div>
      <button onClick={showBox}>Reply</button>
      <button onClick={hideBox}>cancel</button>
      {showReplyBox ? (
        <ReplyComment
          commentData={commentData}
          userData={userData}
          setNotify={setNotify}
          removeShowBox={setShowReplyBox} //hide after comment
        />
      ) : null}
    </div>
  );
}

export function ReplyComment({
  commentData,
  userData,
  removeShowBox,
  setNotify,
}) {
  const { video_id, course_id, comment_id } = commentData;
  const commentArea = useRef();
  const [commentText, setCommentText] = useState(null);
  const [height, setHeight] = useState("auto");

  const commentFetching = (event) => {
    var commentValue = event.target.value;
    setHeight("auto"); // Reset height to auto to recalculate the height based on content
    setHeight(event.target.scrollHeight + "px");
    console.log(event.target.scrollHeight);
    setCommentText(commentValue);
  };

  const sendComment = async function (event) {
    event.preventDefault();

    if (commentText.trim()) {
      const time = new Date();
      const modifiedTime = moment(time).format("DD-MM-YYYY hh:mm-A");

      const replyCommentData = {
        comment: commentText,
        comment_id: comment_id,
        comment_user: userData ? userData.displayName : "anonymous",
        course_id: course_id,
        time: modifiedTime,
        video_id: video_id,
      };

      const response = await SendData(
        "/video_action/reply_comment",
        replyCommentData
      );
      if (response.authType == 200) {
        setNotify(response.message);
        removeShowBox(false);
      }
    } else {
      setNotify("please type a comment");
    }
  };

  return (
    <>
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
        <button>Cancel</button>
      </form>
    </>
  );
}
