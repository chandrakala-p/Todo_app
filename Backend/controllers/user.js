const User = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// sign up 
exports.createUser = async (req, res) => {
    try {
        //collect all information
        const { name, email, password } = req.body
        //validate the data, if exists
        if (!(email && password && name)) {
            res.status(401).send("All fileds are required")
        }
        //check if email is in correct format

        //check if user exists or not
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(401).send("User already found in database")
        }

        //encrypt the password
        const myEncyPassword = await bcrypt.hash(password, 10)


        //create a new entry in database
        const user = await User.create({
            name,
            email,
            password: myEncyPassword,
        })

        //create a token and send it to user
        const token = jwt.sign({
            id: user._id, email
        }, 'shhhhh', { expiresIn: '2h' })


        user.token = token
        //don't want to send the password
        user.password = undefined

        return res.status(201).json(user)


    } catch (error) {
        console.log(error);
        console.log("Error is response route");
    }
}


// login user 
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const isEmailExists = await User.findOne({ email });
        if (!isEmailExists)
            throw new Error("no such email found please sign up");

        //check user in database
        const user = await User.findOne({ email });


        //if user does not exists - assignment
        //match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id, email }, 'shhhhh', { expiresIn: '2h' })


            user.password = undefined
            user.token = token

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })

        }
        //create token and send
        res.sendStatus(400).send("email or password is incorrect")

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
        return;
    }
}


// get user 
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user)
            throw new Error("no such user exists");
        user.password = undefined;
        res.status(201).json({
            success: true,
            user
        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

// get user 
exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).json({
            success: true,
            user
        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}