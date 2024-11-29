import express from 'express'
import { initializeDatabase, listTransactions } from '../controller/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/initialize', initializeDatabase);
transactionRouter.get('/list', listTransactions);

export default transactionRouter;
