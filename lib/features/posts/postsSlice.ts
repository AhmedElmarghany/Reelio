import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// interface PostType {
//                 post_data: {
//                     post_id: string,
//                     user_id: string,
//                     movie_id: string,
//                     text: string,
//                     date_time: string,
//                     rate: string,
//                     likes: string,
//                     comments: string,
//                     id: string,
//                     name: string,
//                     user_name: string,
//                     pic_url: string,
//                     email: string,
//                     password: string,
//                     birth_date: string,
//                     join_date: string,
//                     bio: string,
//                     onboarded: string,
//                     api_token: string
//                 },
//                 movie_data: [
//                     {
//                         id: string,
//                         movie_id: string,
//                         title: string,
//                         posterLink: string,
//                         year: string
//                     }
//                 ],
//                 likes: [],
//                 comments: Record<string, unknown>[],
//                 is_liked: boolean,
//                 is_bookmarked: boolean
//             }
// interface typoo {
//     postsList: [
//       {
//             post: PostType
//         }
//     ]}
export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  date_time: string;
}
export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  date_time: string;
}

export interface MovieData {
  id: string;
  movie_id: string;
  title: string;
  posterLink: string;
  year: string;
}

export interface PostData {
  post_id: string;
  user_id: string;
  movie_id: string;
  text: string;
  date_time: string;
  rate: string;
  likes: string;
  comments: string;

  // user info (included inside the same object)
  id: string;
  name: string;
  user_name: string;
  pic_url: string;
  email: string;
  password: string;
  birth_date: string;
  join_date: string;
  bio: string;
  onboarded: string;
  api_token: string;
}

export interface Post {
  post_data: PostData;
  movie_data: MovieData[];
  likes: Like[];
  comments: Comment[];
  is_liked: boolean;
  is_bookmarked: boolean;
}

export interface PostWrapper {
  post: Post;
}

export interface PostsResponse {
  postsList: PostWrapper[];
}

const initialState: PostsResponse = {
  postsList: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (
      state,
      action: PayloadAction<PostsResponse>
    ) => {
      state.postsList = action.payload.postsList;
    },
  },
});

// export const { setCredentials, logout } = userSlice.actions;
export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
