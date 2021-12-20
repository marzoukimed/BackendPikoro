//ici le schema de notre entité
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        Name: String,
        lastName: {
            type:String,
            require:true
        
        },
        email: {
            type: String,
            unique: true
        },
        password: String,
        Photo: String
    },
    {
        timestamps: true
    }
);


const User = mongoose.model("user", userSchema);

module.exports = User;