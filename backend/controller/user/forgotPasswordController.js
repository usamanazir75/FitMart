const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

// Forgot Password Controller
async function forgotPasswordController(req, res) {
    try {
        const { email, answer1, answer2, newPassword } = req.body;

        if (!email || !answer1 || !answer2 || !newPassword) {
            throw new Error("Please provide all required fields.");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User does not exist.");
        }

        // Check if the provided answers match the stored answers
        if (user.answer1 !== answer1 || user.answer2 !== answer2) {
            throw new Error("Security answers do not match.");
        }

        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);

        if (!hashPassword) {
            throw new Error("Error in hashing the password.");
        }

        // Update user's password
        user.password = hashPassword;
        await user.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "Password changed successfully!",
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = forgotPasswordController;
