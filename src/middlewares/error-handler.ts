import { NextFunction, Request, Response } from "express";

import { getErrorMessage } from "../utils";
import config from "../config";
import CustomError from "../errors/CustomError";

export default function errorHandler( error: unknown, req: Request, res: Response, next: NextFunction ) {
    if (res.headersSent || config.debug) {
        next(error);
        return;
    }

    if (error instanceof CustomError) {
        res.status(error.statusCode).json({
            error: {
                message: error.message,
                code: error.code
            }
        })
    }

    res.status(500).json({
        error: {
            message: getErrorMessage(error) || "An error occurre. Please view logs for more details"
        }
    });
}