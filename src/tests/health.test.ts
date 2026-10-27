import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("GET /health", () => {

    it("should return HTTP 200 and healthy status", async () => {

        // Arrange: The Express app is already configured.

        // Act: Send an HTTP GET request to our application.
        const response = await request(app).get("/health");

        // Assert: Verify the HTTP status code.
        expect(response.status).toBe(200);

        // Assert: Verify the JSON response body.
        expect(response.body).toEqual({
            status: "ok"
        });
        

    });

});
