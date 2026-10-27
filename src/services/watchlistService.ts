import type { Repository } from "../models/repository.js";
import { getGitHubRepository } from "../services/githubClient.js";
import { addRepository} from "../data/watchlistStore.js";
import { getRepositories} from "../data/watchlistStore.js";
import { deleteRepositories} from "../data/watchlistStore.js";


export async function addToWatchlist(
    owner: string,
    repo: string
): Promise<Repository | null> {
   
    const data = await getGitHubRepository(owner, repo);
    
    const exists = addRepository(data);
    
    if(exists) {
        return null;
    }
    
    
    return data;

}

export function getWatchlist(): Repository[] {
    return getRepositories();
}

export function removeFromWatchlist(
    owner: string,
    repo: string
): boolean {
    // Call the store function that deletes repositories
    return deleteRepositories(owner, repo);
}