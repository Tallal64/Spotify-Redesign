import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./feature/spotifySlice";
import { spotifyApi } from "./services/spotify";

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
