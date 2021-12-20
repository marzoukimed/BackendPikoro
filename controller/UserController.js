const User = require ("../models/USERmodel");
const bcrypt = require("bcrypt");//pour le cryptage de notre password
var jwt = require('jsonwebtoken'); //to generate our token


let hashedPassword='';
module.exports = {

    createUser: async (req,res) => {
        const {Name,lastName,email,Photo}=req.body;

        //pour hasher notre password
        hashedPassword = await bcrypt.hash(req.body.password,10);
        
        //verification if user already exists
        const verifEmail = await User.findOne({email});

        if(verifEmail){
            res.status(401).json({error:"Cannot Duplicate email", user:verifEmail})
        }
        const user = new User({Name,lastName,email,Photo});
        
        //affecter hashedpassword dans password de l'objet user
        user.password=hashedPassword;
        await user.save();
            res.json(user);
            console.log(user)
    },

    userSignIn: async (req, res) => {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(req.body.password, user.password) && user.email == email) {
            console.log("Loged In");
            //res.json(user)
            const us ={name:user.Name, lname:user.lastName, mail:user.email}
            //generation de token containing all the user data except the password
            const token = jwt.sign({ us },'my_secret_key');
            res.json({token: token});
        } else {
            console.log("User Not Found")
            res.send("Email Or Password false")
        }


    }
}