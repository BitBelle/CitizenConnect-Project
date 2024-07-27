import { Request, Response } from 'express';
import { DbHelper } from '../DatabaseHelpers';
import Bcrypt from 'bcrypt';

const dbInstance = new DbHelper();

export async function resetPassword(req: Request, res: Response) {
    try {
        const { resetToken, newPassword } = req.body;

        // Validate the reset token and get the user information
        const resetRecord = (await dbInstance.getResetRecord(resetToken)).recordset[0];
        
        if (!resetRecord || new Date(resetRecord.resetTokenExpiry) < new Date()) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Hash the new password
        const hashedPassword = await Bcrypt.hash(newPassword, 9);

        // Update the user's password
        await dbInstance.updateUserPassword(resetRecord.userId, hashedPassword);

        // Delete or mark the reset token as used
        await dbInstance.deleteResetToken(resetToken);

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
