import React, { Component } from "react";
import { useRouter } from "next/router";
import PlayListVideoCard from "@/components/playlistVideoCard";

export default function Page({ data }) {
  console.log(data);
  const { videos, playlist_info } = data;
  const router = useRouter();
  const { course_id } = router.query;

  const currentPlaylist = router.query.id;
  console.log(currentPlaylist);
  return (
    <div>
      {videos.map((x) => (
        <PlayListVideoCard
          video_data={x}
          key={x.video_caption}
          course_id={course_id}
        />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const playlistId = { course_id: context.query.course_id };
  console.log(playlistId, "skddko");
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
