import express, { type Request, type Response, type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "../middlewares/error-handler";
import { Db, MongoClient } from "mongodb";
import mongoose from "mongoose";

const buildServer = async (): Promise<Express> => {
    const app = express();

    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use(cors());

    const test = await mongoose.connect('mongodb://mongodb:password@localhost:27025/?authSource=admin', {
        dbName: 'dispo-admin'
    })

    const schemaMap = [
        { name: 'user', schema: { name: String }, collection: 'user' },
        { name: 'instances', schema: { name: String }, collection: 'instances' },
    ]

    schemaMap.forEach((item) => {
        const schema = new mongoose.Schema(item.schema)
        mongoose.model(item.name, schema, item.collection)
    })

    // const testSchema = new mongoose.Schema()

    // testSchema.pre('find', async () => {
    //     console.log('Pre Find')
    // })


    app.post('/:collection/:action', async (req: Request, res: Response) => {

        const { filter, projection, params } = req.body

        const data = await mongoose.models[req.params.collection][req.params.action](filter, projection, params)
        
        res.json({
            data
        })
    })

    app.get("/health", (_: Request, res: Response) => {
        res.json({ ok: true, env: process.env.PORT });
    });

    // app.use(errorHandler);

    // if (config.env !== "production") {
    //   console.clear();
    // }

    return app;
};

export default buildServer;