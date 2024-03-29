import style from "/styles/admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function PlayList_Card({ playlist_data, isAdmin = true }) {
  console.log(playlist_data);
  const url = isAdmin
    ? `/admin/courses/${playlist_data.id}`
    : `/courses/${playlist_data.id}`;
  return (
    <a href={url}>
      <article className={style.playlist_card}>
        <div className={style.content}>
          <h1>{playlist_data.data.playlist_name}</h1>

          <div className={style.namespace}>
            <span>Rational Cyberlabs</span>
          </div>
        </div>
      </article>
    </a>
  );
}

//playlist_data.data.playlist_name
