import express, { Request, Response } from 'express';
import { ResendEmailService } from './services/resend/resend';
import { TelegramService } from './services/telegram';
import { WorkflowEngine } from '@repo/engine/engine';
import { formTrigger, telegramExecutor } from '@repo/nodes/nodes';

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

app.post('/workflow/execute', async (req: Request, res: Response) => {
  try{
    const workflow = req.body;
    const engine = new WorkflowEngine();

    engine.registerNodeType('form-trigger', formTrigger);
    engine.registerNodeType('telegram', telegramExecutor);

    await engine.executeWorkflow(workflow);

    res.status(200).json({
      success: true,
      message: 'workflow executed successfully'
    })
  }
  catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

app.listen(3001, () => {
  console.log('http server started, server listening on port 3001');
})