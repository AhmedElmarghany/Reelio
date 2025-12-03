import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostsResponse, setPosts } from "./postsSlice";
// import { RootState } from "../../store";

const BASE = process.env.NEXT_PUBLIC_CLIENT_BASE;
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE}/posts`,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostsResponse, string>({
      query: (auth) => ({
        url: "all",
        method: "GET",
        headers: {
          Authorization: auth,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPosts(data));
        } catch (err) {
          console.log("Fetching Posts Failed:", err);
        }
      },
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
