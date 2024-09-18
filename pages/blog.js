import React, { Component } from "react";
import BlogPost from "@/components/blogPost";
import style from "/styles/blog.module.css";

export default function Blog({ data }) {
  return (
    <div className="pad_container">
      <div className={style.blog_container}>
        <h1>Blog</h1>
        {data.map((post) => {
          return <BlogPost data={post} />;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.Vercel_URL}/api/blog/get_posts`
      : "http://localhost:3000/api/blog/get_posts";

  const response = await fetch(apiUrl, {
    method: "GET",
  });
  const res = await response.json();
  console.log(res);
  return {
    props: {
      data: res.data,
    },
  };
}
