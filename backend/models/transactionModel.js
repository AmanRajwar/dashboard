import mongoose from "mongoose";

// Define Schema and Model
const transactionSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;