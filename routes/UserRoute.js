const router = require("express").Router();
const UserController = require("../controller/UserController");

//we use multer to upload image
const multer = require("multer");
const path = require("path");


//ici ou on va stocker l'image + son nom
const storageData = multer.diskStorage({
    destination: (req, file, clb) => {
        clb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        const newFileName = new Date().getTime().toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});


const upload = multer({ storage: storageData })

//Pour Donner l'accées au frontend 
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

//Our routers here 
/**
 * @Path /user
 */
router.route("/SignUp")
    .post(UserController.createUser);



router.post("/file", upload.single("avatar"), function (req, res) {
        const file = req.file;
        if (file) {
          res.json(req.file);
        } else throw "error";
      });

router.route("/SignIn")
    .post(UserController.userSignIn);


module.exports = router;