import { useAppDispatch, useAppSelector } from "@/hooks";
import HomeLayout from "@/layout/HomeLayout";
import { movieDetailAction } from "@/redux/movieReducer";
import store, { AppDispatch, AppState } from "@/redux/store";
import { fetcher } from "@/utils/config";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
//Nest - Next
type Props = {
  ten_phim: string;
  ma_phim: string;
};

const MovieDetailFetcher = (ma_phim: any) => {
  const { data, error, isLoading } = useSWR(
    `https://nodejs.dothinh.info/api/movies/getMovieInfo/${ma_phim}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
};

const PostDetail = ({ ten_phim, ma_phim }: Props) => {
  const router = useRouter();
  if (router.isFallback) return <div>LOADING</div>;

  const { data, error, isLoading } = MovieDetailFetcher(ma_phim);

  if (isLoading) return <div>LOADING</div>;

  return (
    <div>
      <h1>Title: {ten_phim && ten_phim}</h1>
      <p>Image: {data?.data.hinh_anh}</p>
    </div>
  );
};

PostDetail.Layout = HomeLayout;

export default PostDetail;

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  if (!context.params) return { notFound: true };

  const postID = context.params?.postID;
  const response = await fetch(
    `https://nodejs.dothinh.info/api/movies/getMovieInfo/${postID}`
  );
  const post = await response.json();

  return {
    props: {
      ten_phim: post.data.ten_phim,
      ma_phim: post.data.ma_phim,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://nodejs.dothinh.info/api/movies/getMovieByDate?from=2023-3-1&to=2023-4-1"
  );
  let posts = await response.json();
  posts = posts.data;
  posts = posts.map((post: any) => ({
    params: { postID: post.ma_phim.toString() },
  }));

  return {
    paths: posts, //[]
    // paths: {
    //   {params: {postID: "abc"}}
    // }
    fallback: true,
  };
};

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   context.res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=10, stale-while-revalidate=300"
//   );
//   const postID = context.params?.postID;
//   if (!postID) return { notFound: true };
//   const respone = await fetch(
//     `https://js-post-api.herokuapp.com/api/posts/${postID}`
//   );
//   const post = await respone.json();
//   return {
//     props: {
//       post,
//     },
//   };
// };

//Luôn có dữ liệu mới
// 1st Req: mất 2s -> trả html -> lưu html vào ram
// 2nd Req (2s) -> đem html ở ram trả
// 3rd Req (6s) -> Chạy lại getServerSideProps: mất 2s

// Với stale-while-revalidate: đem html trong ram trả ngay, đồng thời chạy getServerSideProps dưới nền

//ISR

// Ví dụ: build 10 sản phẩm có thể được xem nhất
// Khi người dùng request đến sản phẩm từ 1 - 10 -> trả ngay
// Khi người dùng request đến sản phẩm 11 đổ đi -> generate ra file đó ngay -> trả (mất thời gian generate) -> file thứ 11 đã tồn tại trên hệ thống
// Khi người tiếp theo request đến sản phẩm 11 -> trả ngay
