import { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";

let tokenToUse: string =
  "BQDInh9BQuN5CFaoPJ3emhp8Pw3HeIwOsUA0FoXRQ9xyaYuP-cC2fko4BtMHNmuUmiFw9qTKtg_hpnIbt23UYlfez3-URVjfQtoTSbw_SUetIF2FbHV3l_tjyToBvmVfnpHPWOw2U-t6EmOo1PRxoD9IIdvIWKaRbakv6LwuuvMs-lMOZD0MdtYB0_mw1f0gySXzNwFj99jyf1tE7Js65wdVHwocC3vmNMZ4EhrukoEcOGyx8ppJCkimqUDXTHJQCQulPUnBVPJIIHekEgSdJ-02RMDMxin7jBqXOUsCeUYFFUE3JkMffgyx5Y3JWimDRg";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(tokenToUse);

interface RequestQuery {
  p: string;
}

const getMyDataController = async (_: Request, res: Response) => {
  try {
    const result = await spotifyApi.getMe();
    return res.status(200).json({ code: 200, data: result.body });
  } catch (error: any) {
    return res.status(500).json({ code: 500, data: error.message });
  }
};

const getMyDevicesController = async (_: Request, res: Response) => {
  try {
    const result = await spotifyApi.getMyDevices();
    return res.status(200).json({ code: 200, data: result.body });
  } catch (error: any) {
    return res.status(500).json({ code: 500, data: error.message });
  }
};

const getUserController = async (
  req: Request<{}, {}, {}, RequestQuery>,
  res: Response
) => {
  try {
    const { query } = req;

    console.log;

    const result = await spotifyApi.getUser(query.p);
    return res.status(200).json({ code: 200, data: result.body });
  } catch (error: any) {
    return res.status(500).json({ code: 500, data: error.message });
  }
};

export { getMyDataController, getMyDevicesController, getUserController };
