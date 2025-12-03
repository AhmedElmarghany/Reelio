import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
type UserType = {
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
} | null;
export interface UserState {
  token: string | null;
  user_data: UserType;
}

const initialState: UserState = {
  user_data: null,
  token: typeof window !== "undefined" ? Cookies.get("token") || null : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user_data: UserType; token?: string }>
    ) => {
      state.user_data = action.payload.user_data;
      state.token = action.payload.token ?? state.token;

      if(state.token){
        Cookies.set("token", state.token, {
          expires: 7,
          sameSite: "strict",
        });
      }
    },
    logout: (state) => {
      state.user_data = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

// export const { setCredentials, logout } = userSlice.actions;
export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
