import { inngest } from "../client.js";
import Ticket  from "../../models/ticket.js";
import { NonRetriableError } from "inngest";
import { sendEmail } from "../../Utils/mailer.js";
import  User  from "../../models/user.model.js";
import analyzeTicket from "../../Utils/Aiagent.js";



export const onTicketCreated= inngest.createFunction(
    {id : "on-ticket-created",retries:2},
    { event: "ticket/created" },
    async ({ event, step }) => {
            try{
                const {ticketId}=event.data;

                /// fecth the data from the database
       const ticket =   await step.run("fetch-ticket", async () => {
                    const ticketObject = await Ticket.findById(ticketId);
                    if (!ticket) {
                        throw new NonRetriableError("Ticket not found");
                    }

                    return ticketObject
                }); 

     const relatedSkills  =   await step.run("update-ticket-status",async () => {
                await Ticket.findByIdAndDelete(ticket._id,{
                    status: "TODO"
                });
            });

      const aiResponse =   await   analyzeTicket(ticket)

      await step.run("ai-processing",
        async ()=>{
        let skills=[]
        if(aiResponse){
            await Ticket.findByIdAndUpdate(ticket._id, {
                priority: !["low","medium","high"].
                includes(aiResponse.priority) ? "medium" : aiResponse.priority,
            helpfulNotes: aiResponse.helpfulNotes,
            status: "IN_PROGRESS",
            relatedSkills: aiResponse.relatedSkills,

      })

      skills=aiResponse.relatedSkills

        
    }

    return skills;
});

  const moderator =await step.run("assign-moderator",
    async()=>{
      let user=await User.fineONe({
        role: "moderator",
        skills :{
            $eleMatch:{
                $regex: relatedSkills.join("|"),
                $options: "i"
            },
        },

      });


      if(!user){
        user=await User.findOne({role: "admin"});

      }
      await Ticket.findByIdAndUpdate(ticket._id, {
        assignedTo: user?._id || null,
      });

      return user;
  } );
  await step.run("send-email-notification",async () => {
    if(moderator){
      const finalTicket=   await Ticket.findById(ticket._id)
           await sendEmail(
           
            moderator.email,
            " Ticket Assigned",
            `A new ticket has been assigned to you:\n\nTitle: ${finalTicket.title}`
           )
        }
})

return  {success : true}


    }catch (err) {
        console.error(err);
        return { success: false, error: err.message };
            }
        }
);