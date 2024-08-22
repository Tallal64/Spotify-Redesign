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
import Albums from "./pages/Albums.jsx";
import Audiobooks from "./pages/Audiobooks.jsx";
import {
  FollowedArtists,
  Home,
  Login,
  RecommendedArtists,
  RecommendedMusic,
  SavedSongs
} from "./pages/index.js";
import { store } from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="home" element={<Home />}>
        <Route path=":id" element={<Audiobooks />} />
        <Route path=":id" element={<RecommendedMusic />} />
        <Route path=":id" element={<RecommendedArtists />} />
        <Route path=":id" element={<Albums />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="followed" element={<FollowedArtists />} />
      <Route path="saved" element={<SavedSongs />} />
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
