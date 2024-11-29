import Transaction from '../models/transactionModel.js';
import { CatchAsyncError } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../utils/ErrorHandler.js'
import { getMonthFilter } from '../utils/monthFilter.js';

export const getStatistics = CatchAsyncError(async (req, res, next) => {
    try {
        const { month } = req.query;

        // Get the reusable filter for the month
        const monthFilter = getMonthFilter(month);

        // Fetch transactions for the selected month irrespective of the year
        const soldItems = await Transaction.find({ sold: true, ...monthFilter });
        const notSoldItems = await Transaction.find({ sold: false, ...monthFilter });

        // Calculate total sale amount
        const totalSaleAmount = soldItems.reduce((sum, item) => sum + item.price, 0);

        res.status(200).json({
            success: true,
            data: {
                totalSaleAmount,
                totalSoldItems: soldItems.length,
                totalNotSoldItems: notSoldItems.length,
            },
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
