import React, { useState } from "react";
import style from "/styles/admin.module.css";
import PlayList_Card from "@/components/playlist-card";
import SendData from "@/components/sendData";

export default function PlayList({ data }) {
  const [playlist, setPlaylist] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState(null);

  const submitForm = async function (event) {
    event.preventDefault();
    const trimName = newPlaylist.trim();

    try {
      const response = await SendData("create-playlist", {
        playlist_name: trimName,
      });
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
