import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import { sqlConfig } from '../Config'
import { sendMail } from '../Helpers'
import { error, log } from 'console'
import ejs from 'ejs'
import { DBHelper } from '../DatabaseHelper'

dotenv.config({ path: path.resolve(__dirname, "../../.env") })


const dbInstance = new DBHelper();


export interface User {
    userId: string,
    userImg: string,
    userName: string,
    userEmail: string,
    upassword: string,
    roleName: string,
    isDeleted: number,
    isEmailSent: number
}

export async function  sendEmailNewUser() {
    try{

        const users = await (await dbInstance.query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        console.log(users)

            users.forEach((user)=>{
                ejs.renderFile("templates/register.ejs", {
                    name:user.userName,
                    company_url: "www.citizenconnect360.com"
                }, async (error, data) =>{
                        console.log(data)

                        let messageOptions = {
                            to: user.userEmail,
                            from: process.env.EMAIl,
                            subject: "Welcome to the site",
                            html:data
                        }

                        await sendMail(messageOptions)

                    await dbInstance.query(`UPDATE Users SET isEmailSent=1 WHERE userId='${user.userId}'`)
}

                )
            })

    } catch(error){
        console.log(error)
    }
    
}




// export async function sendEmailNewUser() {
//     try{
        



            

//     } catch (error){
//         console.log(error)
//     }
// }




                
//             //     console.log(data)
//             // //     let messageOptions ={
//             // //         to:user.userEmail,
//             // //         from:process.env.userEmail,
//             // //         subject:"Welcome to CitizenConnect360!",
//             // //         html:data
//             // //         }
                    
//             // //         await sendMail(messageOptions)

//             // // await dbInstance.query(`UPDATE Users SET isEmailSent=1 WHERE userId='${user.userId}'`)
// }