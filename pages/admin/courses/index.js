import React, { useState, useContext } from "react";
import style from "/styles/admin.module.css";
import PlayList_Card from "@/components/playlist-card";
import SendData from "@/components/sendData";
import { NotificationProvider } from "@/pages/_app";
export default function PlayList({ data }) {
  const [playlist, setPlaylist] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [newPlaylistInfo, setNewPlaylistInfo] = useState({
    playlist_name: null,
    playlist_description: null,
  });
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState(null);
  const [notify, setNotify] = useContext(NotificationProvider);

  const handleInput = (event) => {
    const { name } = event.target;
    const targetValue = event.target.value.trim();

    setNewPlaylistInfo((prev) => ({ ...prev, [name]: targetValue }));
  };

  const submitForm = async function (event) {
    event.preventDefault();

    const data = new FormData();
    data.append("playlist_name", newPlaylistInfo.playlist_name);
    data.append("playlist_description", newPlaylistInfo.playlist_description);
    data.append("file", image);

    try {
      const response = await SendData(
        "create-playlist",
        data,
        "multipart/form-data",
        false
      );
      if (response.authType == 200) {
        console.log(response.playlistName);
        setIsClicked(null);
        setNewPlaylistInfo(null);
        setNotify(response.message);
        setPlaylist(response.playlistName);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleImage = async (event) => {
    var file = event.target.files[0];
    var urlImage = URL.createObjectURL(file);
    setImage(file);

    setShowImage(urlImage);
  };

  return (
    <div>
      {playlist
        ? playlist.map((item) => {
            return <PlayList_Card playlist_data={item} key={item.id} />;
          })
        : null}
      <button onClick={() => setIsClicked((prev) => !prev)}>
        New Playlist
      </button>
      {isClicked ? (
        <form onSubmit={submitForm}>
          <input
            type="text"
            onChange={handleInput}
            autoFocus={true}
            required
            name="playlist_name"
            placeholder="enter playlist name"
          ></input>
          <input type="file" onChange={handleImage} required></input>
          <img src={showImage} height={"300px"}></img>
          <textarea
            onChange={handleInput}
            required
            name="playlist_description"
            placeholder="please enter a description at least 10 words"
          ></textarea>
          <button>Confirm</button>
        </form>
      ) : null}
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
