import { z } from "zod";
import type { Repository } from "../models/repository.js";
import {GitHubApiError} from "../shared/GitHubApiError.js";




export async function getGitHubRepository(
    owner: string,
    repo: string
) {

    const githubURL = (`https://api.github.com/repos/${owner}/${repo}`);

    const response = await fetch(githubURL); 

    if(!response.ok) {
    throw new GitHubApiError(
        "GitHub request failed",
        response.status
    );
    
    }

    const data: unknown = await response.json();

    const GithubRepositorySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        stargazers_count: z.number(),
        forks_count: z.number(),
        language: z.string().nullable(),
        html_url: z.string(),
        owner: z.object({

            login: z.string()
        })
    });

    const parsedData = GithubRepositorySchema.parse(data);

    const repository: Repository = {
        owner: parsedData.owner.login, 
        name: parsedData.name,
        description: parsedData.description,
        stars: parsedData.stargazers_count,
        forks: parsedData.forks_count,
        language: parsedData.language,
        url: parsedData.html_url
    }

    return repository;



}