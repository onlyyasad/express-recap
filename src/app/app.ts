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
const productRouter = express.Router();
const adminRouter = express.Router();
const cartRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/admin/', adminRouter);
app.use('/api/v1/cart/', cartRouter);

cartRouter.get("/all", (req: Request, res: Response)=>{
  res.status(200).json({
    success: true,
    message: "Cart data retrieved successfully.",
    data: [
      {
        id: 1,
        name: "Shoe",
        price: 20,
        quantity: 1
      },
      {
        id: 2,
        name: "Bag",
        price: 2000,
        quantity: 2
      }
    ]
  })
})

userRouter.post('/create-user', (req: Request, res: Response)=>{
  const user = req.body;
  res.json({
    success: true,
    message: "User created successfully",
    data: user
  })
});

productRouter.get('/all', (req: Request, res: Response)=>{
  const products = [
    {
      id: 1,
      title: "Denim Pants for girls",
      price: 1200,
      stock: 1000,
      category: "Cloth"
    },
    {
      id: 2,
      title: "T-Shirt for boys",
      price: 700,
      stock: 950,
      category: "Cloth"
    },
    {
      id: 3,
      title: "IPhone charger",
      price: 10000,
      stock: 602,
      category: "Electronics"
    },
    {
      id: 4,
      title: "Night beauty cream.",
      price: 1500,
      stock: 1201,
      category: "Beauty Products"
    }
  ]

  res.json({
    success: true,
    message: "Products retrieved successfully!",
    data: products
  })
})

adminRouter.get('/users', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    res.status(200).json({
      success: true,
      message: "Admin user retrieved successfully!",
      data: [
        {
          name: "Hafij",
          email: "hafij@email.com"
        },
        {
          name: "Asad",
          email: "asad@email.com"
        }
      ]
    })
  }catch(error){
    next(error)
  }
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

//global not found error: must be bottom of all api route

app.all("*", (req: Request, res: Response)=>{
  res.status(400).json({
    status: false,
    message: "Route is not defined!"
  })
})
//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction)=>{
  console.log(error)
  if(error){
    res.status(500).json({
      success: false,
      message: "Something went wrong!"
    })
  }
})

export default app;