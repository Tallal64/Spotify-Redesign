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
  Audiobooks,
  FollowedArtists,
  Home,
  Login,
  Playlist,
  RecommendedArtists,
  RecommendedMusic,
  SavedSongs,
} from "./pages/index.js";
import { store } from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}>
        <Route path=":id" element={<Audiobooks />} />
        <Route path=":id" element={<RecommendedMusic />} />
        <Route path=":id" element={<RecommendedArtists />} />
        <Route path=":id" element={<Albums />} />
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
