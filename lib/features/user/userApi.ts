import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface OnboardingResponse {
  success: boolean;
  // user_data: {
  //   id: string;
  //   name: string;
  //   user_name: string;
  //   pic_url: string;
  //   email: string;
  //   password: string;
  //   birth_date: string;
  //   join_date: string;
  //   bio: string;
  //   onboarded: string;
  //   api_token: string;
  // };
  user_data: Record<string, unknown>;
}
interface OnboardingParameters {
  user_info: {
    name: string;
    image: string;
    username: string;
    bio: string;
  };
}
const BASE = process.env.NEXT_PUBLIC_CLIENT_BASE;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE}/user`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    onboarding: builder.mutation<OnboardingResponse, OnboardingParameters>({
      query: (credentials) => ({
        url: "onboarding",
        method: "POST",
        body: JSON.stringify({
          name: credentials.user_info.name,
          image: credentials.user_info.image,
          username: credentials.user_info.username,
          bio: credentials.user_info.bio,
        }),
      }),
    }),
    followUnfollow: builder.mutation({
      query: (credentials) => ({
        url: "userFollowing",
        method: "POST",
        body: JSON.stringify({
          followed_id: credentials.user_id,
        }),
      }),
    }),
    getRandomUsers: builder.query<any, void>({
      query: () => ({
        url: "randomUsers",
        method: "GET",
      }),
    }),
    getNotifications: builder.query<any, void>({
      query: () => ({
        url: "notifications",
        method: "GET",
      }),
    }),
    getActivities: builder.query<any, void>({
      query: () => ({
        url: "activities",
        method: "GET",
      }),
    }),
    getProfile: builder.query<any, { profile_id: number }>({
      query: (credentials) => ({
        url: "getProfile",
        method: "GET",
        body: JSON.stringify({
          id: credentials.profile_id,
        }),
      }),
    }),
  }),
});

export const {
  useOnboardingMutation,
  useFollowUnfollowMutation,
  useGetRandomUsersQuery,
  useGetNotificationsQuery,
  useGetActivitiesQuery,
  useGetProfileQuery,
} = userApi;
