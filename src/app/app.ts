import express, { NextFunction, Request, Response } from 'express';
const app = express();

//parsers

app.use(express.json());
app.use(express.text());

//middleware

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);

  next();
}

//Router

const userRouter = express.Router();

app.use('/api/v1/users', userRouter);

userRouter.get('/create-user', (req: Request, res: Response)=>{
  const user = req.body;
  res.json({
    success: true,
    message: "User created successfully",
    data: user
  })
})


app.get('/', (req: Request, res: Response) => {
  res.send('Hello my World2!')
})

app.get('/product/:productId', (req: Request, res: Response)=>{
  console.log(req.params);
  res.send(`Hello dynamic param ${req.params.productId}`)
})

app.get('/protected', logger, (req: Request, res: Response)=>{
  
  res.send(`Hello from middleware passed route!`)
})

app.post('/', (req: Request, res: Response)=>{
    console.log(req.body);
    res.send(JSON.stringify({data: req.body}))
})

export default app;