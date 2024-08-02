import { Request, Response, RequestHandler } from 'express'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { RegisterSchema } from '../inputValidation/registerSchema'
import Bcrypt from 'bcrypt'
import { Payload, User } from '../Models/authModel'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { log } from 'console'
import { ExtendedRequest1 } from '../middlewares'
import { DbHelper } from '../DatabaseHelpers'
import { UserSchema } from '../inputValidation/authValidation'
import axios from 'axios';
import { NotificationResponse } from '../Models/notificationResponse'

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

const dbInstance = new DbHelper()

// register user
export async function registerUser(req: Request, res: Response) {
    try {
        const id = uid();
        const { userName, userEmail, roleName, upassword, termsAccepted } = req.body;

        const { error } = RegisterSchema.validate(req.body);

        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        const HashPassword = await Bcrypt.hash(upassword, 9);

        const isApproved = roleName === 'Gov-Official' ? 0 : 1; //  0 for Gov-Officials, 1 for others

        await dbInstance.exec("registerUser", {
            userId: id,
            userName: userName,
            userEmail: userEmail,
            roleName: roleName,
            upassword: HashPassword,
            termsAccepted: termsAccepted ? 1 : 0,
            isApproved: isApproved
        });

        const message = roleName === 'Gov-Official'
            ? "Registration successful. Please wait for admin approval."
            : "Registration successful. You are now registered.";

        return res.status(201).json({ message });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json(error);
    }
}


// user approval
export const approveUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if the user exists
        const userResult = await dbInstance.exec('getUser', { userId });

        if (userResult.recordset.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the isApproved field
        await dbInstance.exec('approveUser', { userId });

        return res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
        console.error('Error approving user:', error);
        return res.status(500).json({ message: "Server error", error });
    }
}


// login the user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userEmail, upassword } = req.body;
        // console.log('Login request received with data:', req.body);

        // Input validation
        const { error } = UserSchema.validate(req.body);

        if (error) {
            console.error('Input validation error:', error);
            return res.status(400).json({ message: "User input validation failed!" });
        }

        // Retrieve user by email
        let userResult = await dbInstance.exec("getUserbyEmail", { userEmail: userEmail });

        if (!userResult.recordset.length) {
            console.error('No user found with email:', userEmail);
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        let user = userResult.recordset[0];

        if (user.isDeleted) {
            console.error('Attempted login for deleted user:', userEmail);
            return res.status(403).json({ message: "This account has been deleted." });
        }

        if (user.roleName === 'Gov-Official' && user.isApproved === 0) {
            console.error('Gov-Official user has not been approved yet:', userEmail);
            return res.status(403).json({ message: "Your account is pending approval from an admin." });
        }

        const isValid = await Bcrypt.compare(upassword, user.upassword);

        if (isValid) {
            const payload: Payload = {
                Sub: user.userId,
                userName: user.userName,
                roleName: user.roleName
            };
            const token = await jwt.sign(payload, process.env.SECRET as string, { expiresIn: '10h' });
            console.log("Login Successful for user: ", userEmail);

            return res.status(200).json({
                message: "Login Successful!",
                token: token,
                // payload: {
                //     userId: user.userId,
                //     userName: user.userName,
                //     roleName: user.roleName
                // }
            });
        }

        return res.status(400).json({ message: "Invalid Credentials" });

    } catch (error) {
        console.log('Server error: ', error);
        return res.status(500).json({ message: "Server error", error });
    }

}


export const getUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = (await dbInstance.exec('getUser', { userId: req.params.id })).recordset[0] as User

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const getUsers: RequestHandler = async (req, res) => {
    try {

        const users = (await dbInstance.exec('getUsers', {})).recordset as User[]

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
}



export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const { userId } = req.body;

        // Check if the user exists
        const user = await dbInstance.exec('getUser', { userId: id });

        if (user.recordset.length > 0) {
            // user exists, DELETE
            await dbInstance.exec('deleteUser', { userId: id });

            // updating isDeleted flag
            return res.status(200).json({ message: "User Successfully Deleted", userId: id });
        } else {
            // user not found
            res.status(404).json({ message: "User not Found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// deleted users
export const getDeletedUsers: RequestHandler = async (req, res) => {
    try {
        console.log('Executing stored procedure getDeletedUsers...');
        const result = await dbInstance.exec('getDeletedUsers', {});
        console.log('Stored procedure executed. Result:', result);

        if (result && result.recordset) {
            const users = result.recordset as User[];
            console.log('Deleted users:', users);
            res.status(200).json(users);
        } else {
            console.log('No users found or result.recordset is undefined.');
            res.status(200).json([]);
        }
    } catch (error) {
        console.error('Error fetching deleted users:', error);
        res.status(500).json({ message: 'Failed to retrieve deleted users' });
    }
};


// Get notifications for new government officials
export const getNotifications = async (req: Request, res: Response) => {
    try {
        // Call the stored procedure to retrieve notifications
        const result = await dbInstance.exec('getGovernmentOfficialRequest', {});
        const notifications = result.recordset.map((row: any) => ({
            user: {
                userId: row.userId,
                userName: row.userName,
                roleName: row.roleName,
            }
            
        }));

        // Send the response
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}



// Clear notifications
export const clearNotifications = async (req: Request, res: Response) => {
    try {
        await dbInstance.exec('clearNotifications', {});
        res.status(200).json({ message: "Notifications cleared successfully" });
    } catch (error) {
        console.error('Error clearing notifications:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}




export const welcomePage = (req: ExtendedRequest1, res: Response) => {
    try {
        res.status(200).send(`<h2> Welcome ${req.info?.userName} </h2>`)

    } catch (error) {

    }
}
