import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create a configuration object
let emailConfig = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    // secure: false, // true for 465, false for other portsn
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }

    
};

console.log(process.env.EMAIL);
console.log(process.env.PAss);


// Create a transporter
function createTransporter(config: any) {
    return nodemailer.createTransport(config);
}

// Send mail 
export async function sendMail(messageOptions: any) {
    let transporter = createTransporter(emailConfig);

    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");

        let info = await transporter.sendMail(messageOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error sending email:", err);
        throw err; // Re-throw the error after logging it
    }
}
