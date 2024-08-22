import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userData: [],
  trackId: undefined,
  recommendedSavedSongsId: undefined, // For savedSongs-based songs recommendations
  recommendedPlaylistSongsId: undefined, // For playlist-based songs recommendations
  userImage: undefined,
  userName: undefined,
  recommendedPlaylistArtistsId: null, // For playlist-based artists recommendations
  recommendedFollowedArtistsId: null, // For followed-artists based artists recommendations
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTrackId: (state, action) => {
      state.trackId = action.payload;
    },
    setRecommendedSavedSongsId: (state, action) => {
      state.recommendedSavedSongsId = action.payload;
    },
    setRecommendedPlaylistSongsId: (state, action) => {
      state.recommendedPlaylistSongsId = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setRecommendedPlaylistArtistsId: (state, action) => {
      state.recommendedPlaylistArtistsId = action.payload;
    },
    setRecommendedFollowedArtistsId: (state, action) => {
      state.recommendedFollowedArtistsId = action.payload;
    },
  },
});

export const {
  setToken,
  setUserData,
  setTrackId,
  setArtistId,
  setRecommendedSavedSongsId,
  setRecommendedPlaylistSongsId,
  setRecommendedArtistsId,
  setUserImage,
  setUserName,
  setRecommendedPlaylistArtistsId,
  setRecommendedFollowedArtistsId,
} = spotifySlice.actions;

export default spotifySlice.reducer;
