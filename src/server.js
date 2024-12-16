import express from "express";
import { initMongoDB } from "./daos/mongodb/db.conection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cartsRouter from './routes/cart.router.js';
import productsRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from "express-handlebars";
import path from "path";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

//handlebars
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "views"));

//views
app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.use(errorHandler)

const PERSISTENCE = process.env.PERSISTENCE;

if (PERSISTENCE === 'MONGO') {
    initMongoDB()
        .then(() => console.log('Conectado a la base de datos de MongoDB'))
        .catch((error) => console.log(error));
}

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));