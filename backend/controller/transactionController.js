import axios from 'axios';
import { CatchAsyncError } from '../middleware/catchAsyncErrors.js';
import Transaction from '../models/transactionModel.js';
import ErrorHandler from '../utils/ErrorHandler.js'
import { getMonthFilter } from '../utils/monthFilter.js';

// Controller to initialize the database
export const initializeDatabase = CatchAsyncError(async (req, res, next) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        // Clear the database and seed with new data
        await Transaction.deleteMany({});
        await Transaction.insertMany(data);

        res.status(200).json({
            success: true,
            message: 'Database initialized with seed data',
            data,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// Controller to list transactions with search and pagination
export const listTransactions = CatchAsyncError(async (req, res, next) => {
    try {
        let { search = '', page = 1, perPage = 10, month } = req.query;

        page = Number(page);
        perPage = Number(perPage);

        if (isNaN(page) || isNaN(perPage)) {
            return next(new ErrorHandler('Invalid pagination parameters', 400));
        }

        // Initialize query object
        let query = {};

        // Add month filter if provided
        if (month) {
            try {
                const monthFilter = getMonthFilter(month);
                query = { ...query, ...monthFilter };
            } catch (error) {
                return next(new ErrorHandler(error.message, 400));
            }
        }

        // Handle search logic
        if (search) {
            if (!isNaN(Number(search))) {
                query.price = { $lte: Number(search) };
            } else {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ];
            }
        }

        // Count total documents matching the query
        const totalItems = await Transaction.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalItems / perPage);

        // Fetch the current page's transactions
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            success: true,
            transactions,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                perPage,
            },
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
