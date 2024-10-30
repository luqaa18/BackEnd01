import express from "express";
import cartRouter from './routes/cart.router.js';
import productRouter from "./routes/product.router.js";
// import userRouter from "./routes/user.router.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.listen(8080, console.log("server ok en 8080"));
