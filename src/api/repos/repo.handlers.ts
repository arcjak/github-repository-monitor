import type { Request, Response } from "express";
import { getGitHubRepository } from "../../services/githubClient.js";
type RepoParams = {
    owner: string;
    repo: string;

}
export async function repositoryHandler(
    req: Request<RepoParams>,
    res: Response
): Promise<void> {
        const owner = req.params.owner;
        const repo = req.params.repo;

        const data = await getGitHubRepository(owner, repo);

        res.json(data);
    
}
