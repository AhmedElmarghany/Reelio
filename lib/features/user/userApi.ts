import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  token: string;
}
const BASE = process.env.NEXT_PUBLIC_CLIENT_BASE;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE}/user`,
  }),
  endpoints: (builder) => ({
    onboarding: builder.mutation<OnboardingResponse, OnboardingParameters>({
      query: (credentials) => ({
        url: "onboarding",
        method: "POST",
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
        body: JSON.stringify({
          name: credentials.user_info.name,
          image: credentials.user_info.image,
          username: credentials.user_info.username,
          bio: credentials.user_info.bio,
        }),
      }),
    }),
  }),
});

export const { useOnboardingMutation } = userApi;
