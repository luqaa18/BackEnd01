import path from "path";
import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/product.router.js";
import { prodMan } from "./managers/product.manager.js";
// import userRouter from "./routes/user.router.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

//handlebars
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "views"));

// app.use('/', userRouter);
app.use("/", viewsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);

const httpServer = app.listen(8080, console.log("server ok en 8080"));

const io = new Server (httpServer);

io.on("connection", async (socket) => {
    console.log("New Connection", socket.id);

     // Emitir la lista de productos al cliente
     const products = await prodMan.getAll();
     socket.emit("products", products);
 
     // Escuchar evento de agregar producto y guardarlo en el JSON
     socket.on("addProd", async (productData) => {
         const newProduct = await prodMan.create(productData);
         const updatedProducts = await prodMan.getAll();
         io.emit("products", updatedProducts);
     });

     socket.on("deleteProd", async (productId) => {
        await prodMan.delete(productId);
        const updatedProducts = await prodMan.getAll();
        io.emit("updateProducts", updatedProducts);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});