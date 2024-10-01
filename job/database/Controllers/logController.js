const logModel = require("../models/logIn");
const config = require("../config");
const bcry = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.getUserRegister = async (req, res) => {
    try {
        const { userName, email, password, name } = req.body;
        const existingUser = await logModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcry.hash(password, 6);
        const newUser = new logModel({ userName, email, password: hashedPassword, name });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.getLogIn = async (request, response) => {
    try {

        const already = await logModel.findOne({ userName: request.body.userName })
        // if (error) return response.status(500).send({ auth: false, token: "problem while log in" });
        if (!already) return response.status(201).send({ auth: false, token: "no user found register first" });
        else {
            const validPas = bcry.compareSync(request.body.password, already.password);
            if (!validPas) return response.status(201).send({ auth: false, token: "please enter valid password" });
            let token = jwt.sign({ id: already._id }, config.secert, { expiresIn: 86400 });
            return response.status(200).send({ auth: true, token });
        }


    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

exports.getUserInfo = (request, response) => {

    let token = request.headers["x-access-token"];
    if (!token) return response.status(201).send({ auth: false, token: "no token provided" });
    jwt.verify(token, config.secert, (error, data) => {
        if (error) return response.status(201).send({ auth: false, token: "invalid token" });
        logModel.findById(data.id)
            .then(res => { response.send(res) })
            .catch((error) => {
                res.status(500).json(error)
            })



    })

}


exports.getUpdateUser = (req, res) => {

    const paramId = req.params.nameId;

    logModel.findOneAndUpdate({ userName: paramId }, {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }).then(response => {
        res.status(200).json({
            message: "updated successfully",
            updatedProfile: response
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })



}



