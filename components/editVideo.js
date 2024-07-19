import React, { useContext, useState } from "react";
import style from "/styles/admin.module.css";

import { NotificationProvider } from "@/pages/_app";
import SendData from "@/components/sendData";
export function EditVideoDetails({
  currentPlaylist,
  isEditable,
  video_id,
  existingData,
  backToPlaylist,
}) {
  const [video_details, setVideoDetails] = useState({
    video_id: video_id,
    video_caption: existingData.video_caption,
    video_link: existingData.video_link,
    video_title: existingData.video_title,
    video_playlist: currentPlaylist,
  });

  const [notify, setNotify] = useContext(NotificationProvider);
  const [isChanged, setIsChanged] = useState(false);
  const handleText = function (event) {
    const { name, value } = event.target;
    isChanged ? null : setIsChanged(true);
    setVideoDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (isChanged) {
      var trimmedData = Object.fromEntries(
        Object.entries(video_details).map(([key, value]) => [
          key,
          value ? value.trim() : null,
        ])
      );

      if (
        trimmedData.video_caption &&
        trimmedData.video_link &&
        trimmedData.video_playlist &&
        trimmedData.video_title &&
        trimmedData.video_id
      ) {
      } else {
        console.log("value is missing");
      }

      var response = await SendData("/admin/edit_video", trimmedData);
      console.log(response);
      if (response.message) {
        setNotify(response.message);
        backToPlaylist ? backToPlaylist((prev) => !prev) : "";
      } else {
        setNotify(response.error);
      }
    } else {
      setNotify("Please Make a change to update");
    }
  };

  const deleteVideo = async () => {
    var confirmation = confirm("do you want to delete this video");
    if (confirmation) {
      var data = { course_id: currentPlaylist, video_id: video_id };
      const response = await SendData("/admin/delete_video", data);
      if (response.message) {
        setNotify(response.message);
      } else {
        setNotify(response.error);
      }
    }
  };

  return (
    <div className={style.edit_content}>
      <form onSubmit={submitForm}>
        <h1>Edit Video Details</h1>

        <div className={style.video_details}>
          <div className={style.video_text}>
            <label>Title</label>
            <textarea
              onChange={handleText}
              required
              placeholder="Title"
              name="video_title"
              value={video_details.video_title ? video_details.video_title : ""}
            ></textarea>
            <label>Caption</label>
            <textarea
              onChange={handleText}
              required
              placeholder="Caption"
              name="video_caption"
              value={
                video_details.video_caption ? video_details.video_caption : ""
              }
            ></textarea>
            <label>Video Link</label>
            <textarea
              onChange={handleText}
              required
              placeholder="Video Link"
              name="video_link"
              value={video_details.video_link ? video_details.video_link : ""}
            ></textarea>

            <button className={style.blue_button}>Make Changes</button>
          </div>
        </div>
      </form>
      {isEditable ? (
        <button className={style.delete_button} onClick={deleteVideo}>
          Delete
        </button>
      ) : null}
    </div>
  );
}

export function EditVideoThumbnail({ existingData, course_id, video_id }) {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState(existingData.video_thumbnail);
  const [notify, setNotify] = useContext(NotificationProvider);

  const handleImage = function (event) {
    var imageFile = event.target.files[0];
    setImage(imageFile);
    var convertedImage = URL.createObjectURL(imageFile);
    setShowImage(convertedImage);
  };

  console.log(existingData);

  const submitImageForm = async (event) => {
    event.preventDefault();
    const dataForm = new FormData();
    dataForm.append("course_id", course_id);
    dataForm.append("video_id", video_id);
    dataForm.append("file", image);
    console.log(dataForm);
    const response = await SendData(
      "/admin/change_thumbnail",
      dataForm,
      "multipart/form-data",
      false
    );
  };

  return (
    <div className={style.edit_content}>
      <form onSubmit={submitImageForm}>
        <h1>Choose ThumbNail (Single)</h1>

        <div className={style.video_details}>
          <div>
            <img src={showImage}></img>
            <span>change thumnail</span>
            <input
              type="file"
              id="file"
              onChange={handleImage}
              required
              placeholder="change thumnail"
            ></input>
          </div>

          <button className={style.blue_button}>Post</button>
        </div>
      </form>
    </div>
  );
}
