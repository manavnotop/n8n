import { ExecutionContext, NodeExecutionData, NodeExecutor } from "@repo/types/types";
import 'dotenv/config'
import { Resend } from "resend";

export class ResendExecutor implements NodeExecutor{
  async execute(context: ExecutionContext): Promise<NodeExecutionData[]> {
    const { inputData, node } = context;
    const parameters = node.parameters || {};
    
    const apiKey = parameters.apiKey || process.env.RESEND_API_KEY;
    
    if(!apiKey){
      throw new Error('api key is required for sending mail using resend');
    }
    
    const firstInput = inputData[0]?.json || {};
    const from = parameters.from;
    const to = this.interpolateMessage(parameters.to, firstInput);;
    const subject = parameters.subject || 'Email from n8n';
    const textTemplate = parameters.text || 'Hello from n8n';
    const htmlTemplate = parameters.html;
    
    if(!from){
      throw new Error("for sending mail using resend 'form' parameter is required");
    }
    
    if(!to){
      throw new Error("for sending mail using resend 'to' parameter is required");
    }

    const text = this.interpolateMessage(textTemplate, firstInput);
    const html = this.interpolateMessage(htmlTemplate, firstInput);
    const subjectText = this.interpolateMessage(subject, firstInput);

    try{
      const resend = new Resend(apiKey);
      console.log('reached try and catch from resend');
      const result = await resend.emails.send({
        from,
        to,
        subject: subjectText,
        text,
        html
      })

      console.log('email sent successfully')

      return [{
        json: {
          status: 'sent',
          emailId: result.data?.id, 
          from, 
          to,
          subject: subjectText,
          timeStamp: new Date().toString(),
        }
      }]
    }
    catch(error: any){
      console.error('email sending failed');
      if(error.response){
        throw new Error('resend api error');
      }
      else{
        throw new Error('failed to send email');
      }
    }
  }

  private interpolateMessage(template: string, data: Record<string, any>): string {
    let message = template;

    for (const [key, value] of Object.entries(data)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`{{\\s*\\$json\\.${escapedKey}\\s*}}`, 'g');
      message = message.replace(regex, String(value));
    }

    for (const [key, value] of Object.entries(data)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`{{\\s*${escapedKey}\\s*}}`, 'g');
      message = message.replace(regex, String(value));
    }

    return message;
  }
}