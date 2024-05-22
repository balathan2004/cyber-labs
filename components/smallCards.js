import style from "/styles/playlist.module.css";
import moment from "moment";
import React, { useState, useRef } from "react";
import SendData from "./sendData";
import { defaultImage } from "./smallComponents";
import { SingleReply } from "./replyComment";
import { TimeSetter } from "./smallComponents";
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
  const { course_id, video_id } = commentData;
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [commentChild, setCommentChild] = useState(
    commentData.hasReplies ? commentData.hasReplies : []
  );

  const commentHandler = () => {
    setIsCommentShow((prev) => !prev);
  };

  const showBox = () => {
    setShowReplyBox((prev) => !prev);
  };

  return (
    <div className={style.comment_item}>
      <div className={style.comment_item_top}>
        <div className={style.left}>
          <img src={defaultImage(commentData.comment_user)}></img>
        </div>
        <div className={style.right}>
          <div className={style.right_top}>
            <span>{commentData.comment_user}</span>
            <span className={style.comment_time}>
              {TimeSetter(commentData.time)}
            </span>
            <p>{commentData.comment}</p>
          </div>
          <div className={style.comment_item_bottom}>
            <div className={style.button_container}>
              <span onClick={showBox}>{!showReplyBox ? "Reply" : "Hide"} </span>
              {commentChild.length > 0 ? (
                <span onClick={commentHandler}>
                  {isCommentShow ? "hide replies" : "see all comments"}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        {isCommentShow
          ? commentChild.map((ele, index) => {
              return (
                <SingleReply
                  commentData={ele}
                  key={index}
                  userData={userData}
                  setNotify={setNotify}
                  updateChildComments={setCommentChild}
                  course_id={course_id}
                  video_id={video_id}
                />
              );
            })
          : null}
      </div>
      {showReplyBox ? (
        <ReplyComment
          commentData={commentData}
          userData={userData}
          setNotify={setNotify}
          updateChildComments={setCommentChild}
          removeShowBox={setShowReplyBox} //hide after comment
          course_id={course_id}
          video_id={video_id}
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
  updateChildComments,
}) {
  const { video_id, course_id, comment_id, comment_user } = commentData;
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
        comment_user: userData ? userData.username : "anonymous",
        time: modifiedTime,
        comment_reply: comment_user,
        course_id: course_id,
        video_id: video_id,
      };

      console.log(replyCommentData);

      const response = await SendData(
        "/video_action/reply_comment",
        replyCommentData
      );
      if (response.authType == 200) {
        setNotify(response.message);
        updateChildComments((prev) => [...prev, replyCommentData]);
        removeShowBox(false);
      }
    } else {
      setNotify("please type a comment");
    }
  };

  return (
    <>
      <form className={style.commentBox} onSubmit={sendComment}>
        <span>Replying to {comment_user}</span>
        <textarea
          onChange={commentFetching}
          required
          ref={commentArea}
          style={{ height }}
          placeholder="Add your comment"
        ></textarea>
        <button type="submit">Comment</button>
        <button onClick={() => removeShowBox(false)}>Cancel</button>
      </form>
    </>
  );
}
