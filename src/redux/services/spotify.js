import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().spotify.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCurrentUserPlaylist: builder.query({
      query: () => `me/playlists/`,
    }),
    getCurrentUserProfileData: builder.query({
      query: () => `me`,
    }),
  }),
});

export const {
  useGetCurrentUserPlaylistQuery,
  useGetCurrentUserProfileDataQuery,
} = spotifyApi;
