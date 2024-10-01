const employModel = require("../models/employ");

exports.getEmployRegister = (req, res) => {
    const { fullName, email, mobile, designation, gender, course, avatar, date } = req.body;
    const instanceOfEmploy = new employModel({
        fullName, email, mobile, designation, gender, course, avatar, date
    })

    if (req.file) {
        instanceOfEmploy.avatar = req.file.filename
    }

    instanceOfEmploy.save()
        .then(response => {
            res.status(200).json({
                message: "employee registered successfully",
                employ: response
            })
        }).catch(err => { res.status(500).json({ error: err }) })

}

exports.getEmploy = (req, res) => {
    employModel.find()
        .then(response => {
            if (response.length > 0) {
                res.status(200).json({
                    message: "employ found",
                    list: response
                })
            } else {
                res.status(200).json({
                    message: "employ not found",
                    output: response
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getUpdateEmploy = (req, res) => {

    const paramId = req.params.empId;

    employModel.findOneAndUpdate({ email: paramId }, {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course,
        avatar: req.file.filename,
        date: Date.now()


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


exports.getDeleteEmploy = (req, res) => {
    const removeId = req.params.del;
    employModel.findOneAndDelete({ fullName: removeId })
        .then(response => {
            res.status(200).json({
                message: "delete successfully",
                deleteProfile: response
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })

}