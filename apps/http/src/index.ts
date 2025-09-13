import express, { Request, Response } from 'express';
import { ResendEmailService } from './services/resend/resend';
import { TelegramService } from './services/telegram';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'backend is working',
  })
})

app.post('/execute', async (req: Request, res: Response) => {
  const { to, chat_id } = req.body;

  try{
    const emailData =  await ResendEmailService(to);
    console.log("data coming from resent", emailData);
    const message = emailData.id
    const sendMessage = await TelegramService(chat_id, message);
    console.log("data coming from telegram service", sendMessage);

    res.json({
      message: 'workflow executed successfully'
    })
  }catch(error){
    res.json({
      message: 'workflow execution failed',
      error: error
    })
  }
})

app.listen(3001, () => {
  console.log('http server started, server listening on port 3001');
})