import express from 'express'
import { getCombinedData } from '../controller/combinedController.js';

const combinedRouter = express.Router();

combinedRouter.get('/get-data', getCombinedData);

export default combinedRouter;
