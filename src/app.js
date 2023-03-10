/* loguear al usauri: que ocnincidan las contraseñas, inicie sesion y se levante el servidor */
const express = require("express");
const app = express();
const PORT = 1000;
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");

app.use(express.static("public"));

/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "artisticaDali",
    resave: false,
    saveUninitialized: true
}))

/* Routers */
const indexRouter = require("./routes");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));