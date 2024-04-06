import React, { useState, useContext } from "react";
import style from "/styles/admin.module.css";
import PlaylistCreateComponent from "@/components/playlistCreateComponent";
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

  const [notify, setNotify] = useContext(NotificationProvider);

  const submitForm = async function (event) {
    event.preventDefault();
    const trimmedData = Object.fromEntries(
      Object.entries(newPlaylistInfo).map(([key, value]) => [
        key,
        value ? value.trim() : null,
      ])
    );
    const data = new FormData();
    data.append("playlist_name", trimmedData.playlist_name);
    data.append("playlist_description", trimmedData.playlist_description);
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

  return (
    <div>
      <button onClick={() => setIsClicked((prev) => !prev)}>
        New Playlist
      </button>
      {playlist.length > 0 ? (
        playlist.map((item) => {
          return <PlayList_Card playlist_data={item} key={item.id} />;
        })
      ) : (
        <h2>No PlayList found</h2>
      )}

      {isClicked ? (
        <PlaylistCreateComponent
          setNewPlaylistInfo={setNewPlaylistInfo}
          submitForm={submitForm}
          setImage={setImage}
          setIsClicked={setIsClicked}
        />
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
