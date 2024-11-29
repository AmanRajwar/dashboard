import ErrorHandler from './ErrorHandler.js'

export const getMonthFilter = (month) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    if (!month) return next(new ErrorHandler('Month is required', 400));

    // Normalize the month input
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    const monthIndex = monthNames.indexOf(formattedMonth) + 1; // +1 for 1-based index

    // Validate the month name
    if (monthIndex === 0) throw new Error('Invalid month name');

    // Return the MongoDB filter
    return { $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] } };
};
