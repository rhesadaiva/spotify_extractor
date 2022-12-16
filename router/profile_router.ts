import { Router } from "express";
import {
  getMyDataController,
  getMyDevicesController,
  getUserController,
} from "../controller/profile";

const router: Router = Router();

router.get("/me", getMyDataController);
router.get("/devices", getMyDevicesController);
router.get("/user", getUserController);

export default router;
