import { describe, it, expect, vi, beforeEach} from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { getGitHubRepository } from "../services/githubClient.js";
import { GitHubApiError } from "../shared/GitHubApiError.js";

vi.mock("../services/githubClient.js", () => ({
    getGitHubRepository: vi.fn()
}));

describe("GET /repos/:owner/:repo", () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should return HTTP 200 and repository data", async () => {

        // Arrange
        const fakeRepository = {
            owner: "facebook",
            name: "react",
            description: "A JavaScript library",
            stars: 230000,
            forks: 47000,
            language: "JavaScript",
            url: "https://github.com/facebook/react"
        };

        
        // Configure the mocked getGitHubRepository function
        // to resolve with fakeRepository.
        vi.mocked(getGitHubRepository).mockResolvedValue(fakeRepository);


        // Use Supertest to send a GET request
        // to /repos/facebook/react.

        const response = await request(app).get("/repos/facebook/react");
        
    
        // Verify HTTP status 200.
        expect(response.status).toBe(200);


        // Verify response body equals fakeRepository.
        expect(response.body).toEqual(fakeRepository);

        // Verify getGitHubRepository was called with "facebook" and "react".
    expect(getGitHubRepository).toHaveBeenCalledWith("facebook", "react");});

});

it("should return HTTP 404 when repository is not found", async () => {

    // Arrange:
    // Mock getGitHubRepository() to reject with GitHubApiError.
    const error = new GitHubApiError("GitHub request failed", 404);

    vi.mocked(getGitHubRepository).mockRejectedValue(error);

    // Act:
    // Send GET /repos/facebook/nonexistent-repo.
    const response = await request(app).get("/repos/facebook/nonexistent-repo");


    // Assert:
    // Verify response.status is 404.
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
    error: "Repository not found"
});

});