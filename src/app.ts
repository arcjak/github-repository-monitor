export { app };
import express from "express";
import { repoRouter } from "./api/repos/repo.routes.js";
import { watchlistRouter } from "./api/watchlist/watchlist.routes.js";
import { reportRouter } from "./api/reports/report.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());


// ========================================
// HEALTH ENDPOINT
// ========================================

app.get("/health", (req, res) => {

    res.json({
        status: "ok"
    });

});


// ========================================
// GET A GITHUB REPOSITORY
// ========================================


app.use("/repos", repoRouter);
app.use("/watchlist", watchlistRouter);
app.use("/reports", reportRouter);

app.use(errorHandler);