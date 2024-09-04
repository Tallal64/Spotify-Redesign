/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Login } from "./pages";
import { setToken } from "./redux/feature/spotifySlice";
import { Footer, Header, Sidebar } from "./components";
import HeaderLinks from "./components/HeaderLinks";

function Layout() {
  const [profile, setProfile] = useState("");
  const token = useSelector((state) => state.spotify.token);
  const dispatch = useDispatch();
  const location = useLocation();

  // Define the routes where HeaderLinks should be shown
  const showHeaderLinks = ["/", "/music", "/artists", "/albums"].includes(
    location.pathname
  );

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
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.error("Token issue!");
      }
    };

    getUserProfile();
  }, [token, dispatch]);

  return (
    <>
      {token ? (
        <div className="relative">
          <div className="w-screen h-screen overflow-hidden grid grid-rows-[85vh_auto]">
            <div className="grid grid-cols-[15vw_85vw] h-full w-full">
              <div className="h-screen overflow-auto">
                <Sidebar />
              </div>
              <div className="h-full w-full overflow-auto">
                <div className="">
                  <Header />
                </div>
                <div className="h-screen bg-[#03150b]">
                  {/* Conditionally render HeaderLinks */}
                  {showHeaderLinks && <HeaderLinks />}
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <div
            // style="box-shadow: 0px 4px 8px 0px #0F0F0F40;"
            className="bg-[#1a1a1a] bottom-0 absolute z-20 h-[100px] p-5 w-full"
          >
            <Footer />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;
