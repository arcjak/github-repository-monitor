import { describe, it, expect, vi, afterEach } from "vitest";
import { getGitHubRepository } from "../services/githubClient.js";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("getGitHubRepository", () => {
    it("should transform GitHub API data into a Repository", async () => {
        // Arrange: Fake GitHub API JSON
        const gitHub_fake = {
            id: 10270250,
            name: "react",
            full_name: "facebook/react",
            owner: {
                login: "facebook",
                id: 69631,
                type: "Organization"
            },
            html_url: "https://github.com/facebook/react",
            description: "The library for web and native user interfaces.",
            stargazers_count: 230000,
            forks_count: 47000,
            language: "JavaScript",
            private: false
        };

        // Arrange: Mock fetch()
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => gitHub_fake
        });

        vi.stubGlobal("fetch", mockFetch);

        // Act: Call the real service
        const result = await getGitHubRepository("facebook", "react");

        // Assert: Verify transformed Repository
        expect(result).toEqual({
            owner: "facebook",
            name: "react",
            description: "The library for web and native user interfaces.",
            stars: 230000,
            forks: 47000,
            language: "JavaScript",
            url: "https://github.com/facebook/react"
        });

        // Assert: Verify correct API URL
        expect(mockFetch).toHaveBeenCalledWith(
            "https://api.github.com/repos/facebook/react"
        );
    });

    it("should throw GitHubApiError when GitHub returns 404", async () => {
    // Arrange
    const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
    });

    vi.stubGlobal("fetch", mockFetch);

    // Act + Assert
    await expect(
        getGitHubRepository("facebook", "nonexistent-repo")
    ).rejects.toMatchObject({
        status: 404
    });
});
    it("should reject invalid GitHub API data", async () => {
        // Arrange
        const invalidGitHubResponse = {
            name: "react",
            owner: {
                login: "facebook"
            },
            stargazers_count: "230000", // Invalid: should be a number
            forks_count: 47000,
            language: "JavaScript",
            html_url: "https://github.com/facebook/react"
        };

        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => invalidGitHubResponse
        });

        vi.stubGlobal("fetch", mockFetch);

        // Act + Assert
        await expect(
            getGitHubRepository("facebook", "react")
        ).rejects.toThrow();
    });
});