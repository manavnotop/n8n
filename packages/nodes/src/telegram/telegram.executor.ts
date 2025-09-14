import { ExecutionContext, NodeExecutionData, NodeExecutor } from "@repo/types/types";
import axios from "axios";

export class TelegramExecutor implements NodeExecutor{
  async execute(context: ExecutionContext): Promise<NodeExecutionData[]> {
    const { node, inputData } = context;
    const parameters = node.parameters || {};

    const botToken = parameters.botToken;
    const chatId = parameters.chatId;
    const messageTemplate = parameters.message || 'hello from n8n';

    if(!botToken || !chatId){
      throw new Error('using telegram service requires bot token and chat id');
    }

    const firstInput = inputData[0]?.json.formData || {};
    console.log('this is the input', firstInput);

    const message = this.interpolateMessage(messageTemplate, firstInput);

    try{
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      const response = await axios.post(telegramUrl, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })

      return [{
        json: {
          status: "sent",
          messageId: response.data.result.message_id,
          chatId: response.data.result.chat.id,
          timestamp: new Date().toISOString(),
          message: message,
          email: firstInput.email,
          name: firstInput.name
        }
      }]
    }
    catch(error: any){
      console.error('Telegram sending failed:', error.response?.data || error.message);
      throw new Error(`Failed to send Telegram message: ${error.message}`);
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
