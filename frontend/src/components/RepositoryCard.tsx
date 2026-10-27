import type { Repository } from "../types/Repository";

interface RepositoryCardProps {
    repository: Repository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
    return (
        <div className="repository-card">
            <h2>{repository.owner}/{repository.name}</h2>

            <p>{repository.description ?? "No description available"}</p>

            <p>Language: {repository.language ?? "Unknown"}</p>
            <p>Stars: {repository.stars.toLocaleString()}</p>
            <p>Forks: {repository.forks.toLocaleString()}</p>

            <a
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                View on GitHub
            </a>
        </div>
    );
}

export default RepositoryCard;
