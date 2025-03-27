import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

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

  if (config.env !== "production") {
    console.clear();
  }

  return app;
};
