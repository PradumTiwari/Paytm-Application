const express = require('express');
const bodyParser=require('body-parser');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing application/json
app.use(express.json());
const zod = require('zod');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');  // Corrected import
const authMiddleware = require('../middleware/middleware');  // Corrected import
const Account = require('../models/Accounts');

// Validation Schemas
const signupBody = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional(),
});

// Sign Up Route
router.post('/signUp', async (req, res) => {
   
    const { success } = signupBody.safeParse(req.body);  // Corrected variable name
    
    if (!success) {
        return res.status(400).json({ message: "Invalid Inputs " });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    
    if (existingUser) {
        return res.status(400).json({ message: "Email Already Taken" });
    }

 
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
   
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(201).json({
        message: "User Created",
        token,
    });
});

// Sign In Route
router.post('/signIn', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);  // Corrected variable name
    if (!success) {
        return res.status(400).json({ message: "Incorrect Inputs" });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.status(200).json({
            message: "User Signed In",
            token,
        });
    }

    res.status(400).json({ message: "Invalid Credentials" });
});

// PUT Route for Updating User
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);  // Corrected variable name
    if (!success) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }
    await User.updateOne(
        {
            _id: req.userId,
        },
        req.body
    );
    res.json({ message: "User Updated" });
});

module.exports = router;
