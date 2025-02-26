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
app.use('/api/v1/users', userRouter);
userRouter.get('/create-user', (req, res) => {
    const user = req.body;
    res.json({
        success: true,
        message: "User created successfully",
        data: user
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
