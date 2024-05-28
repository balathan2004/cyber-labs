import style from "/styles/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function PlayList_Card({ playlist_data, isAdmin = true }) {
  const url = isAdmin
    ? `/admin/courses/${playlist_data.id}`
    : `/courses/${playlist_data.id}`;

  return (
    <a href={url} className="course_flexbox_link">
      <article className={style.playlist_card}>
        <div className={style.content}>
          <div>
            <img
              src={playlist_data.data.playlist_thumbnail}
              alt={playlist_data.data.playlist_thumbnail}
            ></img>
          </div>
          <div className={style.content_details}>
            <div className={style.left}>
              <img className={style.logo} src={"/images/logo.jpg"}></img>
            </div>
            <div className={style.right}>
              <h1>{playlist_data.data.playlist_name}</h1>
              <span>Rational Cyberlabs</span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}
