/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  MemoryRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import Albums from "./pages/Albums.jsx";
import Artists from "./pages/Artists.jsx";
import Audiobooks from "./pages/Audiobooks.jsx";
import { Discover, Home, LikedSongs, Login } from "./pages/index.js";
import Music from "./pages/Music.jsx";
import { store } from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="home" element={<Home />}>
        <Route path=":id" element={<Audiobooks />} />
        <Route path=":id" element={<Music />} />
        <Route path=":id" element={<Artists />} />
        <Route path=":id" element={<Albums />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="discover" element={<Discover />} />
      <Route path="liked" element={<LikedSongs />} />
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
