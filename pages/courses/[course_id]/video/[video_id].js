import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainVideo from "@/components/mainVideo";

export default function AdminVideo({ playlistData, commentData }) {
  const router = useRouter();
  const { course_id, video_id } = router.query;
  const [changeVideoQuery, setChangeVideoQuery] = useState(video_id);

  const [allComments, setAllComments] = useState(commentData);
  const [currentVideoComment, setCurrentVideoComment] = useState(
    allComments[video_id]
  );

  useEffect(() => {
    console.log(changeVideoQuery);
    setCurrentVideoComment(allComments[video_id]);
    router.push(`/courses/${course_id}/video/${changeVideoQuery}`);
  }, [changeVideoQuery]);

  return (
    <>
      <MainVideo
        videoData={playlistData}
        commentData={currentVideoComment}
        changeComment={setCurrentVideoComment}
        course_id={course_id}
        currentVideo={changeVideoQuery}
        changeVideoQuery={setChangeVideoQuery}
      />
      ;
    </>
  );
}

export async function getServerSideProps(context) {
  const { course_id, video_id } = context.query;

  const playlistId = { course_id: course_id, video_id: video_id };
  const response = await fetch(
    "http://localhost:3000/api/single_playlist_data",
    {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(playlistId),
    }
  );

  const res = await response.json();
  return {
    props: {
      playlistData: res.playlistData,
      commentData: res.commentData,
    },
  };
}
