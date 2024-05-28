import React, { useContext, useState } from "react";
import style from "/styles/admin.module.css";
import { v4 } from "uuid";
import { NotificationProvider } from "@/pages/_app";
import SendData from "@/components/sendData";
export default function CreateComponent({ currentPlaylist, backToPlaylist }) {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState([]);
  const [video_details, setVideoDetails] = useState({
    video_id: v4(),
    video_caption: null,
    video_link: null,
    video_title: null,
    video_playlist: currentPlaylist,
  });
  const [notify, setNotify] = useContext(NotificationProvider);
  const handleImage = function (event) {
    var imageFile = event.target.files[0];
    setImage(imageFile);
    var convertedImage = URL.createObjectURL(imageFile);
    setShowImage(convertedImage);
  };

  const handleText = function (event) {
    const { name, value } = event.target;
    setVideoDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

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

    const data = new FormData();
    data.append("video_caption", trimmedData.video_caption);
    data.append("video_link", trimmedData.video_link);
    data.append("video_title", trimmedData.video_title);
    data.append("video_playlist", trimmedData.video_playlist);
    data.append("video_id", trimmedData.video_id);
    data.append("file", image);
    const url = "/admin/create_video";

    var response = await SendData(url, data, "multipart/form-data", false);
    console.log(response);
    if (response.message) {
      setNotify(response.message);
      backToPlaylist((prev) => !prev);
    } else {
      setNotify(response.error);
    }
  };

  const deleteVideo = async () => {
    var data = { course_id: currentPlaylist, video_id: video_id };
    const response = await SendData("/admin/delete_video", data);
    if (response.message) {
      setNotify(response.message);
    } else {
      setNotify(response.error);
    }
  };

  return (
    <div className={style.content}>
      <form onSubmit={submitForm}>
        <h1>Choose ThumbNail (Single)</h1>

        <div className={style.video_details}>
          <div className={style.thumbnail}>
            <input
              type="file"
              id="file"
              onChange={handleImage}
              required
            ></input>
            <label htmlFor="file">Select Image</label>
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
    </div>
  );
}
