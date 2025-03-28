import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import v1 from "./routes/v1";

export const bootStrap = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get("/health", (_: Request, res: Response) => {
    res.json({ ok: true, env: process.env.PORT });
  });

  app.use("/v1", v1);

  if (config.env !== "production") {
    console.clear();
  }

  return app;
};
