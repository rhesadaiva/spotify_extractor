import { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

interface CallBackResult {
  code: any;
  error: any;
  state: any;
}

const loginController = async (req: Request, res: Response) => {
  try {
    const scopes: readonly string[] = [
      "ugc-image-upload",
      "user-read-playback-state",
      "app-remote-control",
      "user-modify-playback-state",
      "playlist-read-private",
      "user-follow-modify",
      "playlist-read-collaborative",
      "user-follow-read",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-library-modify",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-read-email",
      "user-top-read",
      "streaming",
      "user-read-recently-played",
      "user-read-private",
      "user-library-read",
    ];

    const URI = spotifyApi.createAuthorizeURL(scopes, "", false);
    res.redirect(URI);
  } catch (error: any) {
    return res.status(500).send(`An error occured - ${error.message}`);
  }
};

const callbackController = async (req: Request, res: Response) => {
  try {
    // const error = req.query.error;
    // const code = req.query.code;
    // const state = req.query
    // const { error, code, state } = req.query;

    let callbackResult: CallBackResult = {
      code: req.query.code,
      error: req.query.error,
      state: req.query.state,
    };

    spotifyApi.authorizationCodeGrant(
      callbackResult.code,
      (error, response) => {
        if (error) throw new Error(`Error on authorization - ${error}`);
        const access_token = response.body.access_token;
        const refresh_token = response.body.refresh_token;
        const expires_in = response.body.expires_in;

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log("access_token:", access_token);
        console.log("refresh_token:", refresh_token);
        console.log("expires_in:", expires_in);

        res.send("Success! You can now close the window!");

        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body.access_token;

          console.log("The access token has been refreshed!");
          console.log("access_token:", access_token);

          spotifyApi.setAccessToken(access_token);
        }, (expires_in / 2) * 1000);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { loginController, callbackController };
