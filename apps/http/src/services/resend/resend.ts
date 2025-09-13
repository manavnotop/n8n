import { Resend } from "resend"
import 'dotenv/config'

const resend = new Resend(process.env.RESEND_API_KEY);

export const ResendEmailService = async (to: string) => {
  try{
    console.log('reached resend function')
    const { data, error } = await resend.emails.send({
      from: "Manav <noreply@message.manv.me>", 
      to: to, 
      subject: "this is test email sending",
      html: "<strong>it works!</strong>"
    })
    console.log(data, error)
    if(error){
      throw new Error(error.message);
    }

    return data;
  }
  catch(error){
    throw new Error('failed to send the message');
  }
}