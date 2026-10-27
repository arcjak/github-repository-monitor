import type {
    Request,
    Response,
    NextFunction
} from "express";
import { z } from "zod";
import { GitHubApiError } from "../shared/GitHubApiError.js";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {

    // 1. Check whether error is a ZodError
    //    If so, respond with 400.

    // 2. Check whether error is a GitHubApiError
    //    If so, map the status to the appropriate response.

    // 3. Otherwise, respond with 500.

    if(error instanceof z.ZodError) {
        res.status(400).json({
        error: "Invalid Request"
        });                        
            return;
                }
    
    if(error instanceof GitHubApiError) {
        switch(error.status) {
                
            case 401:
                res.status(401).json({
                    error: "Request not authorized"
                });                   
                break;

            case 404:
                res.status(404).json({
                    error: "Repository not found"
                    });                   
                    break;
            default:
                res.status(500).json({
                error: "Internal Server Error"
                    });                   
                    break;}

            return;
    }
            res.status(500).json({
            error: "Internal Server Error"
        });
}
