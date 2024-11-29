import express from "express";
import transactionRouter from "./transictionRoute.js";
import staticsRouter from "./statisticsRoutes.js";
import chartRouter from "./chartRoutes.js";
import combinedRouter from "./combinedRoutes.js";

const routes = express.Router();



routes.use('/transactions',transactionRouter);
routes.use('/statics',staticsRouter)
routes.use('/charts',chartRouter)
routes.use('/combined',combinedRouter)

export default routes;