const mong = require("mongoose");
const schemaMethod = mong.Schema;
const instanceOf = new schemaMethod(
    {
        userName:String,
        email: String,
        password: String,
        name: String,
    }, { timestamps: true }
)
module.exports = mong.model("signIn", instanceOf, "signIn");