const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = {};
const blockedUsers = {};
const sessions = {};

// To Generate 6-digit OTP by random number
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /auth/request-otp
app.post("/auth/request-otp", (req, res) => {
    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({ message: "Email or phone required" });
    }

    if (blockedUsers[identifier] && blockedUsers[identifier] > Date.now()) {
        const remaining =
            Math.ceil((blockedUsers[identifier] - Date.now()) / 60000);

        return res.status(403).json({
            message: `User blocked. Try again after ${remaining} minutes.`,
            blocked: true,
        });
    }

    const otp = generateOTP();

    otpStore[identifier] = {
        otp,
        expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes OTP validity
        attempts: 0,
    };

    console.log(`OTP for ${identifier}: ${otp}`);

    res.json({ message: "OTP sent successfully (mocked)" });
});

// POST /auth/verify-otp
app.post("/auth/verify-otp", (req, res) => {
    const { identifier, otp } = req.body;

    const record = otpStore[identifier];

    if (!record) {
        return res.status(400).json({ message: "No OTP requested" });
    }

    if (record.expiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
        record.attempts += 1;

        if (record.attempts >= 3) {
            blockedUsers[identifier] = Date.now() + 10 * 60 * 1000; // 10 min
            delete otpStore[identifier];
            return res
                .status(403)
                .json({ message: "Too many attempts. User blocked for 10 minutes." });
        }

        return res.status(401).json({
            message: `Invalid OTP. Attempts left: ${3 - record.attempts}`,
        });
    }

    // For Success case
    const token = uuidv4();
    sessions[token] = { identifier };

    delete otpStore[identifier];

    res.json({ token });
});

// GET /auth/me
app.get("/auth/me", (req, res) => {
    const token = req.headers.authorization;

    if (!token || !sessions[token]) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
        identifier: sessions[token].identifier,
        message: "Welcome!",
    });
});

app.listen(5000, () =>
    console.log("Backend running on http://localhost:5000")
);
