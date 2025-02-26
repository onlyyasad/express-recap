"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
//middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
//Router
const userRouter = express_1.default.Router();
const productRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products/', productRouter);
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    res.json({
        success: true,
        message: "User created successfully",
        data: user
    });
});
productRouter.get('/all', (req, res) => {
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
    ];
    res.json({
        success: true,
        message: "Products retrieved successfully!",
        data: products
    });
});
app.get('/', (req, res) => {
    res.send('Hello my World2!');
});
app.get('/product/:productId', (req, res) => {
    console.log(req.params);
    res.send(`Hello dynamic param ${req.params.productId}`);
});
app.get('/protected', logger, (req, res) => {
    res.send(`Hello from middleware passed route!`);
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify({ data: req.body }));
});
exports.default = app;
