/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  // AccessTokenFunction
  useEffect(() => {
    const getToken = async () => {
      const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

      const body = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: client_id,
        client_secret: client_secret,
      }).toString();

      const options = {
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        },
        data: body,
      };

      try {
        const response = await axios(options);
        console.log(response.data.access_token);
        console.log(response.data.token_type);
        console.log(response.data.expires_in);
      } catch (error) {
        console.log(error);
      }
    };

    // getToken();
  }, []);

  return <div>Home</div>;
};

export default Home;
