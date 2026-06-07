import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
  }

  const user = localStorage.getItem("harmony_auth_user");
  const accessToken = localStorage.getItem("harmony_auth_access_token");
  const refreshToken = localStorage.getItem("harmony_auth_refresh_token");

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: string;
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("harmony_auth_user", user);
        localStorage.setItem("harmony_auth_access_token", accessToken);
        if (refreshToken) {
          localStorage.setItem("harmony_auth_refresh_token", refreshToken);
        }
      }
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("harmony_auth_user");
        localStorage.removeItem("harmony_auth_access_token");
        localStorage.removeItem("harmony_auth_refresh_token");
      }
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("harmony_auth_access_token", action.payload);
      }
    },
  },
});

export const { setCredentials, logOut, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
