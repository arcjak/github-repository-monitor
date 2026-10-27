import { Router } from "express";
import { reportHandler } from "./report.handlers.js";
import { popularReportHandler } from "./report.handlers.js";

export const reportRouter = Router();


// 4. Define route
reportRouter.get("/languages", reportHandler);
reportRouter.get("/popular", popularReportHandler);


