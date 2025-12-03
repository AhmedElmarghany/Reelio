import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import postsSlice from "./features/posts/postsSlice";
import { postsApi } from "./features/posts/postsApi";
// import { tmdbApi } from "./features/tmdb/tmdbApi";
import { authApi } from "./features/auth/authApi";
import { userApi } from "./features/user/userApi";
import { tmdbApi } from "./features/tmdb/tmdbApi";

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware, postsApi.middleware, userApi.middleware, tmdbApi.middleware),
    // getDefault().concat(postsApi.middleware, tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
