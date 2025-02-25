import express, { Request, Response } from 'express';
const app = express();

//parsers

app.use(express.json());
app.use(express.text());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello my World!')
})

app.post('/', (req: Request, res: Response)=>{
    console.log(req.body);
    res.send(JSON.stringify({data: req.body}))
})

export default app;