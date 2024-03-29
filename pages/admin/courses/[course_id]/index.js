import React, { useState } from "react";
import { useRouter, useEffect } from "next/router";
import style from "/styles/admin.module.css";

import PlayListVideoCard from "@/components/playlistVideoCard";

import CreateComponent from "@/components/playlistCreateComponent";

export default function Page({ data }) {
  const router = useRouter();
  const { course_id } = router.query;
  const { playlist_info, videos } = data;
  const [isCreate, setIsCreate] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState(videos ? videos : []);

  return (
    <div className="container">
      <div>{playlist_info.playlist_name}</div>
      <div>{playlist_info.content}</div>
      <div className={style.selection}>
        <button onClick={() => setIsCreate(false)}>PlayList</button>
        <button onClick={() => setIsCreate(true)}>Create video</button>
      </div>
      {isCreate ? (
        <CreateComponent currentPlaylist={course_id} />
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
