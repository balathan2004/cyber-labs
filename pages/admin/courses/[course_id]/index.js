import React, { useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import style from "/styles/admin.module.css";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayListVideoCard from "@/components/playlistVideoCard";
import { NotificationProvider } from "@/pages/_app";
import CreateComponent from "@/components/videoCreateComponent";
import SendData from "@/components/sendData";

export default function Page({ data }) {
  const router = useRouter();
  const searchInput = useRef(null);
  const { course_id } = router.query;
  const { playlist_info, videos } = data;
  const [notify, setNotify] = useContext(NotificationProvider);
  const [isCreate, setIsCreate] = useState(false);
  const [clear, setClear] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState(videos ? videos : []);

  const deletePlaylist = async (course_id) => {
    const permission = confirm("Are you sure to delete this playlist");
    if (permission) {
      const response = await SendData("/admin/delete_playlist", {
        course_id: course_id,
      });
      setNotify(response.message);
      router.push("/admin/courses");
    }
  };

  const handleInput = function (event) {
    const value = event.target.value.trim();
    if (value) {
      setPlaylistVideos((prev) => {
        const newPlaylist = prev.filter((video) =>
          video.video_title.toLowerCase().includes(value)
        );
        return newPlaylist;
      });
      setClear(true);
    } else {
      setClear(false);
      setPlaylistVideos(videos);
    }
  };

  const handleClear = () => {
    searchInput.current.value = "";
    setPlaylistVideos(videos);
    setClear(false);
  };

  return (
    <div className="pad_container">
      <div className={style.video_page}>
        <div className={style.playlist_details}>
          <nav>
            <div className={style.text}>
              <span> name : {playlist_info.playlist_name}</span>
              <span>{playlist_info.content}</span>
            </div>
            <div className={style.bar}>
              <FontAwesomeIcon
                className={style.search_icon}
                icon={faMagnifyingGlass}
              />
              <input
                ref={searchInput}
                onChange={handleInput}
                placeholder="Search video"
              />

              {clear ? (
                <FontAwesomeIcon
                  onClick={handleClear}
                  className={style.clear_icon}
                  icon={faX}
                />
              ) : null}
            </div>
          </nav>
          <div className={style.button_group}>
            <button
              className={!isCreate ? style.active_button : ""}
              onClick={() => setIsCreate(false)}
            >
              Videos
            </button>
            <button
              className={isCreate ? style.active_button : ""}
              onClick={() => setIsCreate(true)}
            >
              Create video
            </button>
            <button
              onClick={() => {
                deletePlaylist(course_id);
              }}
            >
              Delete Playlist
            </button>
          </div>
        </div>
        {isCreate ? (
          <CreateComponent
            currentPlaylist={course_id}
            backToPlaylist={setIsCreate}
          />
        ) : (
          <div className="course_flexbox">
            {playlistVideos.length > 0 ? (
              playlistVideos.map((x, index) => (
                <PlayListVideoCard
                  video_data={x}
                  key={x + index}
                  course_id={course_id}
                  isAdmin={true}
                />
              ))
            ) : (
              <div className={style.empty_box}>
                <h1>No video Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const playlistId = { course_id: context.query.course_id };
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.Vercel_URL}/api/admin/single_playlist`
      : "http://localhost:3000/api/admin/single_playlist";
  const response = await fetch(apiUrl, {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify(playlistId),
  });

  const res = await response.json();
  return {
    props: {
      data: res.message,
    },
  };
}
