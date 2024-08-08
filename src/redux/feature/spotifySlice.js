import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userProfileData: [],
  trackId: undefined,
  artistId: undefined,
  recommendedSongsId: undefined,
  recommendedArtistsId: undefined,
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
    setTrackId: (state, action) => {
      state.trackId = action.payload;
    },
    setArtistId: (state, action) => {
      state.artistId = action.payload;
    },
    setRecommendedSongsId: (state, action) => {
      state.recommendedSongsId = action.payload;
    },
    setRecommendedArtistsId: (state, action) => {
      state.recommendedArtistsId = action.payload;
    },
  },
});

export const {
  setToken,
  setUserData,
  setTrackId,
  setArtistId,
  setRecommendedSongsId,
  setRecommendedArtistsId,
} = spotifySlice.actions;

export default spotifySlice.reducer;
