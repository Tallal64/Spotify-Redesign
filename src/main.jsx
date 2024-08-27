import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";

import {
  Albums,
  Artists,
  FollowedArtists,
  Home,
  Login,
  Music,
  Playlist,
  SavedSongs,
} from "./pages/index.js";
import { store } from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="albums" element={<Albums />} />
        <Route path="artists" element={<Artists />} />
        <Route path="music" element={<Music />} />
      </Route>
      <Route path="followed" element={<FollowedArtists />} />
      <Route path="saved" element={<SavedSongs />} />
      <Route path="playlist/:id" element={<Playlist />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
