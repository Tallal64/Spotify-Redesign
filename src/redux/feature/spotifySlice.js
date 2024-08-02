import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userProfileData: [],
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setUserData: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

export const { setToken, setUserData } = spotifySlice.actions;

export default spotifySlice.reducer;
