import express from "express";
import cartRouter from './routes/cart.router.js';
import productRouter from "./routes/product.router.js";
import path from 'path';
// import userRouter from "./routes/user.router.js";

const app = express();

//Middlewares
app.use('/static', express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, console.log("server ok en 8080"));
