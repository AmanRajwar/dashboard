import { CatchAsyncError } from '../middleware/catchAsyncErrors.js';
import Transaction from '../models/transactionModel.js';
import ErrorHandler from '../utils/ErrorHandler.js'
import { getMonthFilter } from '../utils/monthFilter.js';

export const getBarChart = CatchAsyncError(async (req, res, next) => {
    try {
        const { month } = req.query;
        if (!month) return res.status(400).json({ success: false, message: 'Month is required' });

        let monthFilter;
        try {
            monthFilter = getMonthFilter(month);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }

        const transactions = await Transaction.find(monthFilter);

        const ranges = [
            [0, 100],
            [101, 200],
            [201, 300],
            [301, 400],
            [401, 500],
            [501, 600],
            [601, 700],
            [701, 800],
            [801, 900],
            [901, Infinity],
        ];

        const barChart = ranges.map(([min, max]) => ({
            range: `${min}-${max === Infinity ? 'above' : max}`,
            count: transactions.filter((t) => t.price >= min && t.price <= max).length,
        }));

        res.status(200).json({
            success: true,
            data: barChart,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});




export const getPieChart = CatchAsyncError(async (req, res, next) => {
    try {
        const { month } = req.query;
        if (!month) return res.status(400).json({ success: false, message: 'Month is required' });

        let monthFilter;
        try {
            monthFilter = getMonthFilter(month);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }

        const transactions = await Transaction.aggregate([
            { $match: monthFilter },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);

        let id = 0;

        res.status(200).json({
            success: true,
            data: transactions.map(({ _id, count }) => ({ id: id++, value: count, label: _id })),
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

