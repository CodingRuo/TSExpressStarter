import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";

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

  return app;
};
