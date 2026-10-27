import type { Request, Response } from "express";
import {getRepositories} from "../../data/watchlistStore.js";
import { z } from "zod";
import { GitHubApiError } from "../../shared/GitHubApiError.js";


const popularQuerySchema = z.object({
    minStars: z.coerce.number().int().min(0).default(0)
});


export function reportHandler(
    req: Request,
    res: Response
): void {
    const repositories = getRepositories();
    const languageCounts: Record<string, number> = {};

    for (const repository of repositories) {
        let language = repository.language ?? "Unknown";
        if(languageCounts[language] !== undefined) {
            languageCounts[language]++;
        }
        else {
            languageCounts[language] = 1;

        }
    }

    res.status(200).json(languageCounts);
}

export function popularReportHandler(
    req: Request,
    res: Response
): void {

try {
    // 1. Read minStars from req.query
    // 2. Convert and validate it as a number

    const num_stars = popularQuerySchema.parse(req.query);

    // 3. Get repositories using getRepositories()
    const repositories = getRepositories();
    // 4. Filter repositories where stars >= minStars
    const popular = repositories.filter((repository)=>{
        return repository.stars >= num_stars.minStars;
    })
    // 5. Return the filtered array as JSON

    res.status(200).json(popular);
}

catch (error) {
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
                });                   break;
                        case 404:
                            res.status(404).json({
                            error: "Repository not found"
                });                   break;
                        default:
                            res.status(500).json({
                            error: "Internal Server Error"
                });                   break;
            
                    }
                    return;
                    }
        res.status(500).json({
        error: "Internal Server Error"})}

}
