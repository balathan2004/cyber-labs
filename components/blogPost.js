import style from "/styles/blog.module.css";
export default function BlogPost({ data }) {
  return (
    <>
      <div className={style.frame__container}>
        <div className={style.frame__headline}>
          <img className={style.headline__image} src="/assets/logo.jpg" />
          <div className={style.frame__column}>
            <p className={style.headline__title}>Rational Cyberlabs</p>
            <p className={style.headline__subtitle}>
              September 30, 2016 ·
            </p>{" "}
          </div>
        </div>
        <div className={style.frame__content}>
          <p className={style.frame__text__small}>{data.blog_caption}</p>
        </div>
        <div className={style.frame__content}>
          <img className={style.frame__image} src={data.image_url} />
        </div>
        <div className={style.frame__footer}></div>
      </div>
    </>
  );
}

/**
 * 
 *    <div className={style.footer__likes}>
            <img
              className={style.footer__image}
              src="http://via.placeholder.com/14x14"
            />
            <p className={style.text__social}>Like</p>
          </div>
 * 
 * 
 */
