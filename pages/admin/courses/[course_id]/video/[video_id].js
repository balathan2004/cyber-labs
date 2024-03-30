import { useRouter } from "next/router";
import React, { useState } from "react";
import CreateComponent from "@/components/playlistCreateComponent";
import style from "/styles/admin.module.css";

export default function AdminVideo({ data }) {
  const router = useRouter();
  const { course_id, video_id } = router.query;
  const [isEdit, setIsEdit] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(
    data.videos.filter((ele) => ele.video_id == video_id)
  );

  return (
    <div className={style.admin_video}>
      <div className={style.video_content}>
        <h1>{currentVideo[0].video_playlist}</h1>

        <video
          src={currentVideo[0].video_link}
          controls
          poster={currentVideo[0].video_thumbnail}
        ></video>
        <h1>{currentVideo[0].video_caption}</h1>

        <button onClick={() => setIsEdit((prev) => !prev)}>Edit</button>
      </div>

      {isEdit ? (
        <CreateComponent
          currentPlaylist={course_id}
          isEditable={true}
          video_id={video_id}
          existingData={currentVideo[0]}
        />
      ) : null}
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
