import { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";

let tokenToUse: string =
  "BQB3IKMhhN44FX_Q_wwFfacyYUfNOO2xJ3SqUljU_pTP3ZiQIix1aHOrkseRDy-K_bOl8CMKP9zNuZMgTU3ZCdKdzuMcRj3Qj8-jxXCM85ITRE_h_UbiEri5jQCeAbj_kX-OaNgYNexBp_6asSVv0745O3KzyEjgji0UTraNNus6fjJtrnbGi7WvKwKPcFfDEdtudBLpUNHaTAYDo7trSb0LSWP6lV_99Es1GQtEM-ZOtY5TLp2qzx9M8m2EnvVJJZpG6cZmqxU3WFwj6TTSen7L7YYfjgTbZHeX0LoYx-rQwmTPAbqyiLj_fRkngiS0iw";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(tokenToUse);

interface RequestQuerySavedTracks {
  limit: number;
  offset: number;
}

const getMySavedTracks = async (
  req: Request<{}, {}, {}, RequestQuerySavedTracks>,
  res: Response
) => {
  try {
    let { query } = req;
    const result = await spotifyApi.getMySavedTracks({
      limit: query.limit,
      offset: query.offset,
    });
    return res.status(200).json({ code: 200, data: result.body });
  } catch (error: any) {
    return res.status(500).json({ code: 500, data: error.message });
  }
};

export { getMySavedTracks };
