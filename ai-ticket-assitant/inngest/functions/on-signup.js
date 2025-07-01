import { inngest } from "../client.js";
import  User  from "../../models/user.model.js";
import { NonRetriableError } from "inngest";
import { sendEmail } from "../../Utils/mailer.js";

export const onUserSignup = inngest.createFunction(
    {id : "on-user-signup",retries:2},
    { event: "user/signup" },
    async ({ event, step }) => {
            try{
                const {email} = event.data;
               const user =await  step.run("get-user-email",async () =>{
                const userObject=await  User.findOne({email})
                   
                if(!userObject){
                    throw new NonRetriableError("User not found");
                }
                    return userObject;
                })
            

                await  step.run("send-welcome-email", async () => {
                   const subject ="welcome to  Ticketing System";
                   const message =`Hi ,
                   \n\n
                   Thank you for signing up.We're glad to have you onboard !     `
                   await sendEmail(user.email, subject, message);
                })



                return { success: true, user: user.email };
    }catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}
);