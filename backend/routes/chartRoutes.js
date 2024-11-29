import express from 'express'
import { getBarChart, getPieChart } from '../controller/chartController.js';

const chartRouter = express.Router();

chartRouter.get('/bar-chart', getBarChart);
chartRouter.get('/pie-chart', getPieChart);

export default chartRouter;
