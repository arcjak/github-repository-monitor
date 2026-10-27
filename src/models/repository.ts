export interface Repository {
    owner: string,
    name: string,
    description: string | null,
    stars: number,
    forks: number,
    language: string | null,
    url: string
}