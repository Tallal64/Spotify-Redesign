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
    getCurrentUserProfileData: builder.query({
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
      query: (artistsId) => `artists/${artistsId}/related-artists`,
    }),
    getUserLikedSongs: builder.query({
      query: () => `me/tracks/`,
    }),
  }),
});

export const {
  useGetCurrentUserProfileDataQuery,
  useGetCurrentUserPlaylistQuery,
  useGetTrackFromPlaylistQuery,
  useGetArtistFromTracksQuery,
  useGetRecommendedSongsQuery,
  useGetRecommendedArtistsQuery,
  useGetUserLikedSongsQuery,
} = spotifyApi;
