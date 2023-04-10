import HomeLayout from "@/layout/HomeLayout";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  posts: any[];
};

const PostsList = ({ posts }: Props) => {
  if (!posts) return;
  return (
    <ul>
      {posts.map((post: any) => {
        return (
          <li key={post.ma_phim}>
            <Link href={`/posts/${post.ma_phim}`}>{post.ten_phim}</Link>
          </li>
        );
      })}
    </ul>
  );
};

PostsList.Layout = HomeLayout;

export default PostsList;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(
    "https://nodejs.dothinh.info/api/movies/getMovieByDate?from=2023-3-1&to=2023-4-1"
  );
  let posts = await response.json();

  return {
    props: {
      posts: posts.data,
    },
    revalidate: 5,
  };
};
