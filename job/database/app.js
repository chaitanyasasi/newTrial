const exp = require("express");
const mong = require("mongoose");
const Cors = require("cors");
const Dot = require("dotenv");
const bcry = require("bcryptjs");

const Route = require("./router");

const corsOptions = {
    origin: "http://localhost:3000",
    method: "GET, POST, PUT, DELETE",
    credentials: true,
    optionSuccessStatus: 200,
    allowHeaders: "X-Requested-With, content-type, x-token, Access-Control-Allow-Credentials"
}

Dot.config();

const app = exp();

app.use(exp.json());
app.use(Cors(corsOptions));
app.options("*", Cors());
app.use("/", Route);
app.use(exp.static("uploads"));

const atlasUrl = "mongodb+srv://code:NbtMDO032UHx2y2a@cluster0.pbwkm6s.mongodb.net/Dealsdry?retryWrites=true&w=majority&appName=Cluster0";

mong.connect(atlasUrl)
    .then(res => {
        app.listen((6105), () => {
            console.log("server listening on 6105")
        })
    })
    .catch((err) => { console.log("server error: " + err) })


