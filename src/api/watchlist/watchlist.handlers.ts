import type { Request, Response } from "express";
import type { Repository } from "../../models/repository.js";
import { z } from "zod";
import { addToWatchlist } from "../../services/watchlistService.js";
import { getWatchlist } from "../../services/watchlistService.js";
import { removeFromWatchlist } from "../../services/watchlistService.js";


const watchlistSchema = z.object({
        owner: z.string(),
        repo: z.string()
  
        })
type WatchlistParams = {
    owner: string;
    repo: string;
};
        
export async function addWatchListHandler(
    req: Request,
    res: Response
): Promise<void> {

        const parsedData = watchlistSchema.parse(req.body);
        const owner = parsedData.owner;
        const repo = parsedData.repo;

        
        const data: Repository | null  = await addToWatchlist(owner, repo);

        if(data === null) {
            res.status(409).json({
            error: "Repository already in watchlist"
            });
        }

        else{

            res.status(201).json(data);
        }

}

export function getWatchListHandler(
    req: Request,
    res: Response
): void {

    const current_repositories = getWatchlist();

    res.json(current_repositories);
}

export function deleteWatchListHandler(
    req: Request<WatchlistParams>,
    res: Response
): void {

       const owner = req.params.owner;
       const repo = req.params.repo;

       const delete_successful = removeFromWatchlist(owner, repo);

    if(delete_successful) {
       res.status(200).json("Repository successfully deleted.");
    }

    else {
        res.status(404).json("No repository exists to delete");
    }

}