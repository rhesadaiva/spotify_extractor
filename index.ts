import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ code: 200, data: "Express+Typescript" });
});

// Router
import authorization from "./router/authorization_router";
import profile from "./router/profile_router";
import tracks from "./router/tracks_router";

const baseUrl: string = "/app";

app.use(`${baseUrl}/auth`, authorization);
app.use(`${baseUrl}/profile`, profile);
app.use(`${baseUrl}/tracks`, tracks);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
