import { Router } from "express";
import { repositoryHandler } from "./repo.handlers.js";
export const repoRouter = Router();


// 4. Define route
repoRouter.get("/:owner/:repo", repositoryHandler);