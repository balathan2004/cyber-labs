import BlogPost from "@/components/blogPost";
import style from "/styles/blog.module.css";
export default function Blog({ data }) {
  const blogData = data;

  return (
    <div className="pad_container">
      <div className={style.blog_container}>
        <h1>Blog</h1>
        {blogData.map((post) => {
          return <BlogPost data={post} />;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.Vercel_URL}/api/admin/blog`
      : "http://localhost:3000/api/admin/blog";

  const request = await fetch("http://localhost:3000/api/admin/blog", {
    method: "GET",
    contentType: "application/json",
  });

  const data = await request.json();

  if (data.status == 200) {
    return {
      props: { data: data.message },
    };
  } else {
    return {
      props: { data: "error caught" },
    };
  }
}
