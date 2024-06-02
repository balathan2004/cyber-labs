import React, { Component } from "react";
import { useRouter } from "next/router";
import PlayListVideoCard from "@/components/playlistVideoCard";
import style from "/styles/playlist.module.css";
export default function Page({ data }) {
  console.log(data);
  const { videos, playlist_info } = data;
  const router = useRouter();
  const { course_id } = router.query;

  const currentPlaylist = router.query.id;
  console.log(currentPlaylist);
  return (
    <div className="pad_container">
      <h1 className="title">{playlist_info.playlist_name} - Videos</h1>
      <div className="course_flexbox">
        {videos.map((x) => (
          <PlayListVideoCard
            video_data={x}
            key={x.video_caption}
            course_id={course_id}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const playlistId = { course_id: context.query.course_id };
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.Vercel_URL}/api/single_playlist`
      : "http://localhost:3000/api/single_playlist";
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
