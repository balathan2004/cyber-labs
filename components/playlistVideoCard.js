import style from "/styles/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PlayListVideoCard({
  video_data,
  course_id,
  isAdmin = false,
}) {
  const url = isAdmin
    ? `/admin/courses/${course_id}/video/${video_data.video_id}`
    : `/courses/${course_id}/video/${video_data.video_id}`;
  console.log(video_data);

  return (
    <a href={url} className="course_flexbox_link">
      <article className={style.playlist_card}>
        <div className={style.content}>
          <div className={style.thumbnail}>
            <LazyLoadImage
              src={video_data.video_thumbnail}
              alt={video_data.video_thumbnail}
              loading="lazy"
            ></LazyLoadImage>
          </div>
          <div className={style.content_details}>
            <div className={style.left}>
              <img className={style.logo} src={"/images/logo.jpg"}></img>
            </div>
            <div className={style.right}>
              <h1>{video_data.video_title}</h1>
              <div className={style.namespace}>
                <span>Rational Cyberlabs</span>
                <p>{video_data.caption ? video_data.caption : "nothing"}</p>
              </div>{" "}
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}
