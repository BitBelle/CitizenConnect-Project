import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import { sqlConfig } from '../Config';
import { sendMail } from '../Helpers';
import { DBHelper } from '../DatabaseHelper';
import { log } from 'console';
import ejs from 'ejs';
import crypto from 'crypto'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbInstance = new DBHelper();

export interface User {
    userId: string;
    userImg: string;
    userName: string;
    userEmail: string;
    upassword: string;
    roleName: string;
    isDeleted: number;
    isEmailSent: number;
}

// token 
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

export async function sendEmailForgotPassword(userEmail: string) {
    try {
        // geting user with the specific email who has not received a reset email
        const user = await (await dbInstance.query(`SELECT * FROM Users WHERE userEmail = '${userEmail}' AND isResetEmailSent = 0`)).recordset[0] as User;

        if (user) {
            const resetToken = generateResetToken()
            const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`

            ejs.renderFile("templates/forgotPassword.ejs", {
                name: user.userName,
                company_url: "www.citizenconnect360.com",
                resetLink: resetLink //passing link

            }, async (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }

                console.log(data);

                let messageOptions = {
                    to: user.userEmail,
                    from: process.env.EMAIL,
                    subject: "Password Reset Request - CitizenConnect360",
                    html: data
                }

                await sendMail(messageOptions);

                // Update the user's reset email status
                await dbInstance.query(`UPDATE Users SET isResetEmailSent=1 WHERE userId='${user.userId}'`);
            });
        } else {
            console.log(`No user found with email ${userEmail} or email has already been sent.`);
        }
    } catch (error) {
        console.log(error);
    }
}









// const 

