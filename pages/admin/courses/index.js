import React, { useState, useContext } from "react";
import style from "/styles/admin.module.css";
import PlaylistCreateComponent from "@/components/playlistCreateComponent";
import PlayList_Card from "@/components/playlist-card";
import SendData from "@/components/sendData";
import { NotificationProvider, LoaderProvider } from "@/pages/_app";

export default function PlayList({ data }) {
  const [playlist, setPlaylist] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [newPlaylistInfo, setNewPlaylistInfo] = useState({
    playlist_name: null,
    playlist_description: null,
  });
  const [image, setImage] = useState({ file: [] });

  const [notify, setNotify] = useContext(NotificationProvider);
  const [loader, setLoader] = useContext(LoaderProvider);
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
      setLoader(true);
      const response = await SendData(
        "/admin/create-playlist",
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
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <div className="pad_container">
      <div className="course_flexbox">
        <div className="course_flexbox_link">
          <article className={style.empty_box}>
            <button
              className={style.empty_button}
              onClick={() => setIsClicked((prev) => !prev)}
            >
              Create New PlayList
            </button>
          </article>
        </div>
        {playlist.length > 0 ? (
          playlist.map((item) => {
            return <PlayList_Card playlist_data={item} key={item.id} />;
          })
        ) : (
          <h2>No PlayList found</h2>
        )}
      </div>

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
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.Vercel_URL}/api/admin/get_playlist`
      : "http://localhost:3000/api/admin/get_playlist";

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
