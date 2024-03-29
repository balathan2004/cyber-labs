import style from "/styles/admin.module.css";

import SendData from "@/components/sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faFileArrowUp } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
export default function Create({ data }) {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState([]);
  const [playlist, setPlaylist] = useState(data[0]);

  const [video_details, setVideoDetails] = useState({
    video_caption: "",
    video_link: "",
    video_title: "",
    video_playlist: playlist,
  });

  const allPlaylist = data;

  const selectPlaylist = (event) => {
    setPlaylist(event.target.value);
  };

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
    console.log(video_details);
    /** 
    const data = new FormData();
    data.append("video_caption", video_details.video_caption);
    data.append("video_link", video_details.video_link);
    data.append("video_title", video_details.video_title);
    data.append("video_playlist", playlistName);
    data.append("file", image);
    var response = await SendData(
      "/createVideo",
      data,
      "multipart/form-data",
      false
    );
    console.log(response);
    */
  };

  useEffect(() => {
    if (playlist != "new playlist") {
      setVideoDetails((prev) => ({ ...prev, ["video.playlist"]: playlist }));
    }
  }, [playlist]);

  return (
    <div className="container">
      <div className={style.content}>
        <form onSubmit={submitForm}>
          <article>
            <h1>Choose ThumbNail (Single)</h1>
            <input type="file" onChange={handleImage} required></input>
          </article>
          <div className={style.video_details}>
            <div>
              <img src={showImage ? showImage : ""}></img>
            </div>
            <div className={style.video_text}>
              <textarea
                onChange={handleText}
                required
                placeholder="Title"
                name="video_title"
              ></textarea>
              <textarea
                onChange={handleText}
                required
                placeholder="Caption"
                name="video_caption"
              ></textarea>
              <textarea
                onChange={handleText}
                required
                placeholder="Video Link"
                name="video_link"
              ></textarea>
              {playlist == "new playlist" ? (
                <textarea
                  required
                  placeholder="playlist name"
                  onChange={handleText}
                ></textarea>
              ) : null}

              <select onChange={selectPlaylist}>
                {allPlaylist.map((singleName) => {
                  return (
                    <option key={singleName} value={singleName}>
                      {singleName}
                    </option>
                  );
                })}
                <option value={"new playlist"}>new playlist</option>
              </select>
              <button>Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl = "http://localhost:3000/api/get_playlist";

  const response = await fetch(apiUrl, {
    method: "GET",
    contentType: "application/json",
  });

  const res = await response.json();

  return {
    props: {
      data: res.data,
    },
  };
}
