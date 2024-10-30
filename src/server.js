import express from "express";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: trues }));

app.listen(8080, console.log("server ok en 8080"));
