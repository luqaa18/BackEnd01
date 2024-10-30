import express from "express";
import cartManager from "./managers/cart.manager.js";
import ProductManager from "./managers/product.manager.js";
import UserManager from "./managers/user-manager.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: trues }));

app.use('/', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.listen(8080, console.log("server ok en 8080"));
