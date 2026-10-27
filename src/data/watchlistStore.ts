import type { Repository } from "../models/repository.js";

let repositories: Repository[] = [];


export function addRepository(repository: Repository): boolean {
    const exists = repositories.some((existing) => {
        return existing.name === repository.name && existing.owner === repository.owner;
    });

    if(!exists){
    repositories.push(repository);
    return false;
    }

    return true;

}

export function getRepositories(): Repository[] {
    return repositories;
}

export function deleteRepositories(owner:string, repo:string): boolean {

    const original_length = repositories.length;
    repositories = repositories.filter((repository) => {
            return !(repository.name === repo && repository.owner === owner);
        })

    if(original_length !== repositories.length) {
        return true;
    }
    return false;

}