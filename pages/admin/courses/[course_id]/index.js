import React, { useContext, useState } from "react";
import { useRouter, useEffect } from "next/router";
import style from "/styles/admin.module.css";

import PlayListVideoCard from "@/components/playlistVideoCard";
import { NotificationProvider } from "@/pages/_app";
import CreateComponent from "@/components/videoCreateComponent";
import SendData from "@/components/sendData";

export default function Page({ data }) {
  const router = useRouter();

  const { course_id } = router.query;
  const { playlist_info, videos } = data;
  const [notify, setNotify] = useContext(NotificationProvider);
  console.log(playlist_info, videos);
  const [isCreate, setIsCreate] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState(videos ? videos : []);
  console.log(playlistVideos);
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

  return (
    <div className="pad_container">
      <div className={style.video_page}>
        <div className={style.playlist_details}>
          <div>Playlist name : {playlist_info.playlist_name}</div>
          <div>Playlist info : {playlist_info.content}</div>
          <div className={style.selection}></div>

          <button
            className={!isCreate ? style.active_button : ""}
            onClick={() => setIsCreate(false)}
          >
            PlayList
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
            Delete
          </button>
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
              <h1>No video Found</h1>
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
