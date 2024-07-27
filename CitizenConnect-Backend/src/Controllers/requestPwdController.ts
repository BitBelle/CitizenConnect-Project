import { Request, Response } from 'express';
import { DbHelper } from '../DatabaseHelpers';
import Bcrypt from 'bcrypt';
import crypto from 'crypto';

const dbInstance = new DbHelper();

export async function requestPasswordReset(req: Request, res: Response) {
    try {
        const { userEmail } = req.body;

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

        // Store the reset token in the database
        await dbInstance.storeResetToken(userEmail, resetToken, resetTokenExpiry);


        return res.status(200).json({ message: "Password reset email sent successfully" });

    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
