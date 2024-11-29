import axios from 'axios';
import { CatchAsyncError } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../utils/ErrorHandler.js'

export const getCombinedData = CatchAsyncError(async (req, res, next) => {
    try {
        const { month } = req.query;
        if (!month) return res.status(400).json({ success: false, message: 'Month is required' });

        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`http://localhost:8000/api/v1/statics/get-stats?month=${month}`),
            axios.get(`http://localhost:8000/api/v1/charts/bar-chart?month=${month}`),
            axios.get(`http://localhost:8000/api/v1/charts/pie-chart?month=${month}`),
        ]);

        res.status(200).json({
            success: true,
            data: {
                statistics: statistics.data,
                barChart: barChart.data,
                pieChart: pieChart.data,
            },
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})
