// import { Request, Response } from 'express';
// import { sendEmailNewUser } from '../EmailService/userRegistration';

// export async function sendWelcomeEmail(req: Request, res: Response) {
//     const { userEmail, userName } = req.body;
//     try {
//         await sendEmailNewUser(userEmail, userName);
//         res.status(200).send({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.error('Error sending welcome email:', error);
//         res.status(500).send({ message: 'Failed to send email' });
//     }
// }
