
import express, { json } from 'express';
import cron from 'node-cron'
import { sendEmailNewUser } from './EmailService/userRegistration';
import { sendEmailForgotPassword } from './EmailService/forgotPassword';


const app = express();
app.use(json());


cron.schedule('*/80 * * * * *', async () => {
    console.log('executing after 80 seconds');
    sendEmailNewUser();
})



cron.schedule('*/5 * * * * *', async () => {
    console.log('executing after 5 seconds');
    sendEmailForgotPassword('');
})




const port = 4001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});
