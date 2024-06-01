import style from "/styles/playlist.module.css";

import React, { useState, useRef } from "react";
import SendData from "./sendData";
import { defaultImage } from "./smallComponents";
import { TimeSetter } from "./smallComponents";
import { ReplyComment } from "./smallCards";
import moment from "moment";
export function SingleReply({
  commentData,
  userData,
  setNotify,
  updateChildComments,
  course_id,
  video_id,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className={style.reply_comment}>
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
            <p>
              {" "}
              <span className={style.user_mention}>
                {commentData.comment_reply}
              </span>
              {commentData.comment}
            </p>
          </div>

          <div className={style.comment_item_bottom}>
            <div className={style.button_container}>
              <span onClick={() => setShowReplyBox((prev) => !prev)}>
                Reply
              </span>
            </div>
          </div>
        </div>
      </div>
      {showReplyBox ? (
        <ReplyComment
          commentData={commentData}
          userData={userData}
          removeShowBox={setShowReplyBox}
          setNotify={setNotify}
          updateChildComments={updateChildComments}
        />
      ) : null}
    </div>
  );
}
