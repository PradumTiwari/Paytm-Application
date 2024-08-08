const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authmiddleware = require('../middleware/middleware');
const Account = require('../models/Accounts');

const router = express.Router();

// Middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// POST /transfer endpoint
router.post('/transfer', authmiddleware, async (req, res) => {
    console.log('Transfer initiated');
    
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Find sender's account
        const fromAccount = await Account.findOne({ userId: req.userId });

        // Check if sender's account exists and has sufficient balance
        if (!fromAccount || fromAccount.balance < amount) {
            throw new Error('Insufficient balance');
        }

        // Find recipient's account
        const toAccount = await Account.findOne({ userId: to });
        if (!toAccount) {
            throw new Error('Invalid recipient');
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });


        res.json({ message: 'Transfer Successful' });
    } catch (error) {
        // await session.abortTransaction();
        console.error('Transaction aborted:', error);
        res.status(400).json({ message: error.message });
    } finally {
        // session.endSession();
    }
});

module.exports = router;
