const exp = require("express");
const Route = exp.Router();
const bp = require("body-parser");


Route.use(bp.urlencoded({ extended: true }));
Route.use(bp.json());

const LogIn = require("./Controllers/logController");
const employData = require("./Controllers/employControl");
const upload = require("./photos/picstore");


Route.post("/register", LogIn.getUserRegister);
Route.post("/LogIn", LogIn.getLogIn);
Route.put("/updateUser/:nameId", LogIn.getUpdateUser);
Route.get("/userinfo", LogIn.getUserInfo);

Route.post("/employees", upload.single("avatar"), employData.getEmployRegister);
Route.get("/allEmployees", employData.getEmploy);
Route.put("/updateEmployee/:empId", upload.single("avatar"), employData.getUpdateEmploy);
Route.delete("/remove/:del", employData.getDeleteEmploy);


module.exports = Route;