import React, { useState } from "react";
import style from "/styles/admin.module.css";
import { v4 } from "uuid";

import SendData from "@/components/sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CreateComponent({
  currentPlaylist,
  isEditable = false,
  video_id = false,
  existingData = false,
}) {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState([]);
  const [video_details, setVideoDetails] = useState({
    video_id: video_id ? video_id : v4(),
    video_caption: existingData ? existingData.video_caption : null,
    video_link: existingData ? existingData.video_link : null,
    video_title: existingData ? existingData.video_title : null,
    video_playlist: currentPlaylist,
  });
  const handleImage = function (event) {
    var imageFile = event.target.files[0];
    setImage(imageFile);
    var convertedImage = URL.createObjectURL(imageFile);
    setShowImage(convertedImage);
  };

  const handleText = function (event) {
    const { name, value } = event.target;
    setVideoDetails((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (
      video_details.video_caption &&
      video_details.video_link &&
      video_details.video_playlist &&
      video_details.video_title &&
      video_details.video_id
    ) {
      console.log(video_details);
    } else {
      console.log("value is missing");
    }

    const data = new FormData();
    data.append("video_caption", video_details.video_caption);
    data.append("video_link", video_details.video_link);
    data.append("video_title", video_details.video_title);
    data.append("video_playlist", video_details.video_playlist);
    data.append("video_id", video_details.video_id);
    data.append("file", image);
    const url = isEditable ? "/admin/edit_video" : "/createVideo";
    console.log(data);
    var response = await SendData(url, data, "multipart/form-data", false);
    console.log(response);
  };

  const deleteVideo = async () => {
    var data = { course_id: currentPlaylist, video_id: video_id };
    await SendData("/admin/delete_video", data);
  };

  return (
    <div className={style.content}>
      <form onSubmit={submitForm}>
        <h1>Choose ThumbNail (Single)</h1>
        <input type="file" onChange={handleImage} required></input>

        <div className={style.video_details}>
          <div className={style.thumbnail}>
            <img src={showImage ? showImage : ""}></img>
          </div>
          <div className={style.video_text}>
            <textarea
              onChange={handleText}
              required
              placeholder="Title"
              name="video_title"
              value={video_details.video_title ? video_details.video_title : ""}
            ></textarea>
            <textarea
              onChange={handleText}
              required
              placeholder="Caption"
              name="video_caption"
              value={
                video_details.video_caption ? video_details.video_caption : ""
              }
            ></textarea>
            <textarea
              onChange={handleText}
              required
              placeholder="Video Link"
              name="video_link"
              value={video_details.video_link ? video_details.video_link : ""}
            ></textarea>

            <button>Post</button>
          </div>
        </div>
      </form>
      {isEditable ? <button onClick={deleteVideo}>Delete</button> : null}
    </div>
  );
}
