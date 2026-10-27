import { Router } from "express";
import { addWatchListHandler } from "./watchlist.handlers.js";
import {getWatchListHandler } from "./watchlist.handlers.js";
import {deleteWatchListHandler } from "./watchlist.handlers.js";




export const watchlistRouter = Router();


// 4. Define route
watchlistRouter.post("/", addWatchListHandler);
watchlistRouter.get("/", getWatchListHandler);
watchlistRouter.delete("/:owner/:repo", deleteWatchListHandler);