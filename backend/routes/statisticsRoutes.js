import express from 'express'
import { getStatistics } from '../controller/statisticsController.js';

const staticsRouter = express.Router();

staticsRouter.get('/get-stats', getStatistics);

export default staticsRouter;
