import { useRouter } from "next/router";
import React, { useState } from "react";
import { EditVideoDetails, EditVideoThumbnail } from "@/components/editVideo";
import style from "/styles/admin.module.css";

export default function AdminVideo({ data }) {
  const router = useRouter();
  const { course_id, video_id } = router.query;
  const [isEdit, setIsEdit] = useState(true);
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

        <button onClick={() => setIsEdit((prev) => !prev)}>
          {isEdit ? "Change Thumbnail" : "Edit Video"}
        </button>
      </div>

      {isEdit ? (
        <EditVideoDetails
          currentPlaylist={course_id}
          isEditable={true}
          video_id={video_id}
          existingData={currentVideo[0]}
          backToPlaylist={setIsEdit}
        />
      ) : (
        <EditVideoThumbnail
          existingData={currentVideo[0]}
          course_id={course_id}
          video_id={video_id}
        />
      )}
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
