/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Sidebar from "./components/custom/Sidebar";
import { Login } from "./pages";
import { setToken } from "./redux/feature/spotifySlice";

function Layout() {
  const [profile, setProfile] = useState("");
  const token = useSelector((state) => state.spotify.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("spotify_token");

    if (hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      if (token) {
        dispatch(setToken(token));
        // console.log(token);
      }

      window.location.hash = "";
      window.localStorage.setItem("spotify_token", token);
    }

    const getUserProfile = async () => {
      if (token) {
        const options = {
          method: "GET",
          url: "https://api.spotify.com/v1/me",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios(options);
          setProfile(response.data);
        } catch (error) {
          console.error(
            "Error aa raha hai profile data fetch krte waqt:",
            error
          );
        }
      } else {
        console.error("masla aa raha hai payen !");
      }
    };

    getUserProfile();
  }, [token, dispatch]);

  return (
    <>
      {token ? (
        <div className="">
          <div className="absolute top-0 left-0 z-10">
            <Sidebar />
          </div>
          <div className="ml-[300px]">
            <Header />
          </div>
          <div className="bg-[#03150b] h-screen ml-[300px]">
            <Outlet />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;
