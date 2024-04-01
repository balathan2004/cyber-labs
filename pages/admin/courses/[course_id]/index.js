import React, { useContext, useState } from "react";
import { useRouter, useEffect } from "next/router";
import style from "/styles/admin.module.css";

import PlayListVideoCard from "@/components/playlistVideoCard";
import { NotificationProvider } from "@/pages/_app";
import CreateComponent from "@/components/playlistCreateComponent";
import SendData from "@/components/sendData";

export default function Page({ data }) {
  const router = useRouter();

  const { course_id } = router.query;
  const { playlist_info, videos } = data;
  const [notify, setNotify] = useContext(NotificationProvider);
  console.log(playlist_info, videos);
  const [isCreate, setIsCreate] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState(videos ? videos : []);

  const deletePlaylist = async (course_id) => {
    const response = await SendData("/admin/delete_playlist", {
      course_id: course_id,
    });
    setNotify(response.message);
    router.push("/admin/courses");
  };

  return (
    <div>
      <div>{playlist_info.playlist_name}</div>
      <div>{playlist_info.content}</div>
      <div className={style.selection}>
        <button onClick={() => setIsCreate(false)}>PlayList</button>
        <button onClick={() => setIsCreate(true)}>Create video</button>
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
        <div className={style.video_list}>
          {playlistVideos.map((x) => (
            <PlayListVideoCard
              video_data={x}
              key={x.video_caption}
              course_id={course_id}
              isAdmin={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const playlistId = { course_id: context.query.course_id };
  const response = await fetch("http://localhost:3000/api/single_playlist", {
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
