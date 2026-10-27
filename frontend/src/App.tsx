
import { useState } from "react";
import "./App.css";
import RepositoryCard from "./components/RepositoryCard";
import type { Repository } from "./types/Repository";

function App() {
    // State variables
    const [owner, setOwner] = useState<string>("");
    const [repo, setRepo] = useState<string>("");
    const [repository, setRepository] = useState<Repository | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [watchlist, setWatchlist] = useState<Repository[]>([]);

function addToWatchlist() {
    if (!repository) return;

    const alreadyAdded = watchlist.some(
        (item) => item.url === repository.url
    );

    if (alreadyAdded) return;

    setWatchlist((previous) => [...previous, repository]);
}

function removeFromWatchlist(url: string) {
    setWatchlist((previous) =>
        previous.filter((item) => item.url !== url)
    );
}

    // Runs when the Search button is clicked
async function handleSearch() {
    setLoading(true);
    setError(null);
    setRepository(null);

    try {
        const response = await fetch(
            `/api/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Repository not found");
            }

            throw new Error(`Request failed: ${response.status}`);
        }

        const data: Repository = await response.json();
        setRepository(data);

    } catch (err) {
        setError(
            err instanceof Error ? err.message : "Unknown error"
        );
    } finally {
        setLoading(false);
    }
}
    return (
        <div className="app">
            <h1>GitHub Repository Monitor</h1>

            <p>
                Search GitHub repositories to view their details
                and track activity.
            </p>

            <div className="search-form">
                <label htmlFor="owner">Repository Owner</label>
                <input
                    id="owner"
                    type="text"
                    placeholder="e.g. facebook"
                    value={owner}
                    onChange={(event) => setOwner(event.target.value)}
                />

                <label htmlFor="repo">Repository Name</label>
                <input
                    id="repo"
                    type="text"
                    placeholder="e.g. react"
                    value={repo}
                    onChange={(event) => setRepo(event.target.value)}
                />

                <button
                    onClick={handleSearch}
                    disabled={loading || !owner.trim() || !repo.trim()}
                >
                    {loading ? "Searching..." : "Search Repository"}
                </button>

                {error && <p className="error-message">{error}</p>}

                {repository && <RepositoryCard repository={repository} />}

                {repository && <RepositoryCard repository={repository} />}    

                {repository && (
                <button onClick={addToWatchlist}>
                    Add to Watchlist
                </button>

                

                
)}        
        </div>
        <h2>My Watchlist ({watchlist.length})</h2>

{watchlist.map((item) => (
    <div key={item.url}>
        <span>{item.owner}/{item.name}</span>

        <button onClick={() => removeFromWatchlist(item.url)}>
            Remove
        </button>
    </div>
))}
        </div>
    );
}

export default App;
