const mong = require("mongoose");
const schemaMethods = mong.Schema;
const instanceOf = new schemaMethods({
    fullName: String,
    email: String,
    mobile: Number,
    designation: String,
    gender: String,
    course: String,
    avatar: String,
    date: {
        type: String,
        default: Date.now
    }

})
module.exports = mong.model("Employ", instanceOf, "Employ");