import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout as clearUserData, setCredentials } from "../user/userSlice";

interface RegisterResponse {
  status: string;
  message: string;
}

export interface LoginSuccessResponse {
  success: boolean;
  token: string;
  user_data: {
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
  };
}

export interface LoginErrorResponse {
  status: string;
  message: string;
}
type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

interface CurrentUserResponse {
  status: string;
  message: string;
  user_data: {
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
  };
}
const BASE = process.env.NEXT_PUBLIC_CLIENT_BASE;
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE}/auth`,
    validateStatus: (response, body) => {
      return (
        response.status === 200 &&
        (body.success === true ||
          body.status === "success" ||
          body.message === "Logged out successfully")
      );
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "login",
          method: "POST",
          body: credentials,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setCredentials({ user_data: (data as LoginSuccessResponse).user_data }));
          } catch (err) {
            console.log("Failed:", err);
          }
        },
      }
    ),
    register: builder.mutation<
      RegisterResponse,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: JSON.stringify({
          name: "Reelio User",
          username: "ReelioUser",
          email: credentials.email,
          password: credentials.password,
          birth_date: "2002-01-01",
          bio: "BIO",
        }),
      }),
    }),
    currentUser: builder.query<CurrentUserResponse, string>({
      query: (token) => ({
        url: "currentUser",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user_data: data.user_data }));
        } catch (err) {
          console.log("Fetching Current User Failed:", err);
        }
      },
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: "logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUserData());
        } catch (err) {
          console.log("Logout failed:", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentUserQuery,
  useLogoutMutation,
} = authApi;
