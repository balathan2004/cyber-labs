import style from "/styles/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
export default function PlaylistCreateComponent({
  submitForm,
  setImage,
  setNewPlaylistInfo,
  setIsClicked,
}) {
  const [showImage, setShowImage] = useState(null);

  const handleImage = async (event) => {
    var file = event.target.files[0];
    var urlImage = URL.createObjectURL(file);
    setImage(file);

    setShowImage(urlImage);
  };

  const handleInput = (event) => {
    const { name } = event.target;
    const targetValue = event.target.value.trim();

    setNewPlaylistInfo((prev) => ({ ...prev, [name]: targetValue }));
  };

  const closeNotice = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <form onSubmit={submitForm} className={style.create_playlist}>
      <FontAwesomeIcon icon={faCircleXmark} onClick={closeNotice} />
      <div className={style.thumbnail}>
        <label htmlFor="file">Select Image</label>
        <img src={showImage} height={"300px"}></img>

        <input type="file" id="file" onChange={handleImage} required></input>
      </div>

      <input
        type="text"
        onChange={handleInput}
        autoFocus={true}
        required
        name="playlist_name"
        placeholder="enter playlist name"
      ></input>
      <textarea
        onChange={handleInput}
        required
        name="playlist_description"
        placeholder="please enter a description at least 10 words"
      ></textarea>
      <button>Confirm</button>
    </form>
  );
}
