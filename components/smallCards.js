import style from "/styles/playlist.module.css";

export function SmallCard({ data, index, changeVideo, changeVideoQuery }) {
  // console.log(data);
  const videoChanger = () => {
    changeVideo(data);
    changeVideoQuery(data.video_id);
  };

  return (
    <div className={style.vid} onClick={videoChanger}>
      <h1></h1>
      <img src={data.video_thumbnail}></img>
      <span>
        {index + 1 + " "}
        {data.video_title}
      </span>
    </div>
  );
}

export function CommentList({ commentData }) {
  return (
    <div className={style.comment_item}>
      <div className={style.left}>
        <img></img>
      </div>
      <div className={style.right}>
        <span>{commentData.comment_user}</span>
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
}
