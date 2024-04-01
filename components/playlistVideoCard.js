import style from "/styles/playlist.module.css";

export default function PlayListVideoCard({
  video_data,
  course_id,
  isAdmin = false,
}) {
  console.log(video_data);
  const url = isAdmin
    ? `/admin/courses/${course_id}/video/${video_data.video_id}`
    : `/courses/${course_id}/video/${video_data.video_id}`;
  return (
    <a href={url} className={style.video_card}>
      <div className={style.vid}>
        <img src={video_data.video_thumbnail}></img>
        <h3 className={style.title}>{video_data.video_title}</h3>
      </div>
    </a>
  );
}
