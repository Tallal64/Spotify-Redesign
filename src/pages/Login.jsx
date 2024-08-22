import Logo from "/Spotify_Logo_RGB_Green.png";

const Login = () => {
  const handleClick = () => {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirect_uri =
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_SPOTIFY_REDIRECT_URI_LOCAL.trim()
        : import.meta.env.VITE_SPOTIFY_REDIRECT_URI_PROD.trim();
    const Url = "https://accounts.spotify.com/authorize?";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-follow-read",
      "playlist-read-private",
      "playlist-read-collaborative",
    ];

    const params = new URLSearchParams({
      response_type: "token",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    }).toString();

    window.location.href = `${Url}${params}&show_dialog=true`;
  };

  return (
    <div className="flex bg-Neutrals-900 flex-col items-center gap-y-14 justify-center h-screen">
      <div className="h-36">
        <img className="w-full h-full" src={Logo} alt="logo.png" />
      </div>

      <button
        className="bg-Accent px-12 py-4 rounded-full font-semibold text-Neutrals-900 tracking-tight"
        onClick={handleClick}
      >
        Connect to Spotify
      </button>
    </div>
  );
};

export default Login;
