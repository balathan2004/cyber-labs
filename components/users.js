import { defaultImage } from "./smallComponents";
import styles from "/styles/admin.module.css";
export default function UserCard({ userdata }) {
  const photoUrl = userdata.photoUrl
    ? userdata.photoUrl
    : defaultImage(userdata.username);
  return (
    <div className={styles.user_card}>
      <div>
        <img src={photoUrl} />
      </div>
      <div>
        <h3>{userdata.username}</h3>
        <h4>{userdata.email}</h4>
      </div>
    </div>
  );
}
