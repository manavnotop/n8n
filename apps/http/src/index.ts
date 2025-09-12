import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'backend is working',
  })
})

app.listen(3001, () => {
  console.log('http server started, server listening on port 3000');
})