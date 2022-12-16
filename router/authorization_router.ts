import { Router } from "express";
import {
  loginController,
  callbackController,
} from "../controller/authorization";

const router: Router = Router();

router.get("/login", loginController);
router.get("/callback", callbackController);

export default router;
