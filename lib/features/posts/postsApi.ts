import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostsResponse, setPosts } from "./postsSlice";
// import { RootState } from "../../store";
import Cookies from "js-cookie";

const BASE = process.env.NEXT_PUBLIC_CLIENT_BASE;
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE}/posts`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostsResponse, void>({
      query: () => ({
        url: "all",
        method: "GET",
      }),
      providesTags: ["Post"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPosts(data));
        } catch (err) {
          console.log("Fetching Posts Failed:", err);
        }
      },
    }),
    toggleLike: builder.mutation({
      query: (credentials) => ({
        url: "addRemoveLike",
        method: "POST",
        body: JSON.stringify({
          post_id: credentials.post_id,
        }),
      }),
    }),
    createPost: builder.mutation({
      query: (credentials) => ({
        url: "createPost",
        method: "POST",
        body: JSON.stringify({
          movie_id: credentials.movie_id,
          text: credentials.text,
          year: credentials.year,
          posterLink: credentials.poster_link,
          title: credentials.movie_title,
          rate: credentials.rate,
        }),
      }),
      invalidatesTags: ["Post"],
    }),
    toggleBookmark: builder.mutation({
      query: (credentials) => ({
        url: "addRemoveBookmark",
        method: "POST",
        body: JSON.stringify({
          post_id: credentials.post_id,
        }),
      }),
    }),
    getBookmarks: builder.query<any, void>({
      query: () => ({
        url: "getBookmarks",
        method: "GET",
      }),
    }),
    getPost: builder.query({
      query: (post_id) => ({
        url: `getPost?post_id=${post_id}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation({
      query: (credentials) => ({
        url: "addComment",
        method: "POST",
        body: JSON.stringify({
          post_id: credentials.post_id,
          text: credentials.text,
        }),
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useToggleLikeMutation,
  useToggleBookmarkMutation,
  useGetBookmarksQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useAddCommentMutation,
} = postsApi;
