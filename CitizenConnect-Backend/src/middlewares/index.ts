// middlewares/verifyToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../Models/authModel';
import { sqlConfig } from '../config';
import mssql from 'mssql';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface ExtendedRequest1 extends Request {
    info?: Payload;
    roleName?: string;
    isAdmin?: boolean;
    isGovOfficial?: boolean;
    isCitizen?: boolean;
}

export async function verifyToken(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string;

        if (!token) {
            return res.status(401).json({ message: 'No access token provided' });
        }

        const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload;
        req.info = decodedData;

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', decodedData.Sub)
            .query('SELECT roleName FROM Users WHERE userId = @userId');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const roleName = result.recordset[0].roleName;
        req.roleName = roleName;
        req.isAdmin = roleName === 'Admin';
        req.isGovOfficial = roleName === 'Gov-Official';
        req.isCitizen = roleName === 'Citizen';

        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


// middleware/checkRole.ts
export function checkRole(role: string) {
    return (req: ExtendedRequest1, res: Response, next: NextFunction) => {
        if (req.roleName !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
