import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  posts: any[];
};

const postsList = ({ posts }: Props) => {
  if (!posts) return;
  return (
    <>
      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default postsList;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const posts = await response.json();

  return {
    props: {
      posts: posts.data,
    },
  };
};
