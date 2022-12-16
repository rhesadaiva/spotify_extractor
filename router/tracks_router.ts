import { Router } from "express";
import { getMySavedTracks } from "../controller/tracks";

const router: Router = Router();

router.get("/saved", getMySavedTracks);

export default router;
