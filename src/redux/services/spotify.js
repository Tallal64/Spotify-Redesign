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
    getCurrentUserData: builder.query({
      query: () => `me`,
    }),
    getCurrentUserPlaylist: builder.query({
      query: () => `me/playlists/`,
    }),
    getTrackFromPlaylist: builder.query({
      query: (trackId) => `playlists/${trackId}/tracks`, // this links is taken from playlist>tracks>id
    }),
    getRecommendedSongs: builder.query({
      query: (recommendedSongsId) =>
        `recommendations?limit=5&seed_tracks=${recommendedSongsId}`,
    }),
    getRecommendedArtists: builder.query({
      query: (recommendedArtistsId) =>
        `artists/${recommendedArtistsId}/related-artists`,
    }),
    getCurrentUserFollowedArtists: builder.query({
      query: () => `me/following?type=artist&limit=50`,
    }),
    getUserSavedSongs: builder.query({
      query: () => `me/tracks?limit=50`,
    }),
    getBrowseCategories: builder.query({
      query: () => `browse/categories`,
    }),
  }),
});

export const {
  useGetCurrentUserDataQuery,
  useGetCurrentUserPlaylistQuery,
  useGetTrackFromPlaylistQuery,
  useGetArtistFromTracksQuery,
  useGetRecommendedSongsQuery,
  useGetRecommendedArtistsQuery,
  useGetArtist,
  useGetCurrentUserFollowedArtistsQuery,
  useGetUserSavedSongsQuery,
  useGetBrowseCategoriesQuery,
} = spotifyApi;
