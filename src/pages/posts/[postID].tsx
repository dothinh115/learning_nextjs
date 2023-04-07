import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
//Nest - Next
type Props = {
  post: any;
};

const postDetail = ({ post }: Props) => {
  return (
    <div>
      <h1>Title: {post.title}</h1>
    </div>
  );
};

export default postDetail;

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  if (!context.params) return { notFound: true };

  const postID = context.params?.postID;
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postID}`
  );
  const post = await response.json();

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  let posts = await response.json();
  posts = posts.data;
  posts = posts.map((post: any) => ({ params: { postID: post.id } }));
  return {
    paths: posts,
    // paths: {
    //   {params: {postID: "abc"}}
    // }
    fallback: false,
  };
};
