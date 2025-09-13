import "dotenv/config"
import axios from "axios";

export const TelegramService = async (chatId: string, message: string) => {
  try {
    console.log('starting to send the message', chatId, message);
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message
    })

    return response.data
  }catch(error: any){
    throw new Error('error occured while sending a message to the user', error.response?.data || error.message);
  }
}