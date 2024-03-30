import React, { useState } from "react";
import style from "/styles/admin.module.css";
import PlayList_Card from "@/components/playlist-card";
import SendData from "@/components/sendData";

export default function PlayList({ data }) {
  const [playlist, setPlaylist] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState(null);
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState(null);

  const submitForm = async function (event) {
    event.preventDefault();
    const trimName = newPlaylist.trim();
    const data = new FormData();
    data.append("playlist_name", trimName);
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
        setNewPlaylist(null);
        console.log(response);
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
    <div className="container">
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
            onChange={(e) => {
              setNewPlaylist(e.target.value);
            }}
            autoFocus={true}
            required
          ></input>
          <input type="file" onChange={handleImage} required></input>
          <img src={showImage} height={"300px"}></img>
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
