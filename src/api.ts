/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import BasicRouter from "./route/BasicRouter";
import catRouter from "./route/Cat";
import commentsRouter from "./route/Comments";
import mapRouter from "./route/Map";
import photoRouter from "./route/Photo";
import postRouter from "./route/Post";
import reportRouter from "./route/Report";
import userRouter from "./route/User";


const api: express.Application = express();


api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.use("/", BasicRouter);
api.use("/cat", catRouter);
api.use("/comment", commentsRouter);
api.use("/map", mapRouter);
api.use("/photo", photoRouter);
api.use("/post", postRouter);
api.use("/report", reportRouter);
api.use("/user", userRouter);


export default api;
