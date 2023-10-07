const User = require('../model/User.model');
const jwt = require('jsonwebtoken');
// const { nextTick } = require('process');
const {promisify} = require('util');

//jwt sign token

const signToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"5m",
    })
};

//signup user

exports.signup = async (req,res,next)=>{
    try {
        const newUser = await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
        });
        const token = signToken(newUser._id);
        // remove pass before sending response
        newUser.password = undefined;
        res.status(201).json({
            status:"success",
            token,
            data:{
                user:newUser,
            },
        });
    } catch (err) {
        if(err) return next(err);
    }
};


// log in user

exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        //if email password not provided
        if(!email || !password){
            res.status(401).json("Please provide email and password");
            return next(new Error('Please provide email and password'));
        }
        //check if user exists and password is correct
        const user = await User.findOne({email});
        if(!user || !(await user.isvalidPassword(password,user.password))){
            res.status(401).json("Incorrect email or password");
            return next(new Error('Incorrect email or password'));
        }
        const token = signToken(user._id);
        let sendUser ;
        let firstName = user.firstName;
        let lastName = user.lastName;
        let storedEmail = user.email;
        let _id = user._id;
        sendUser = {firstName,lastName,storedEmail,_id};
        sendUser['token'] = token;
        res.status(200).json({
            status:"success",
            // token,
            sendUser,
        });
    } catch (err) {
        console.log(err);

        throw err;
    }
};


//create an auth middleware that will proetct routes
exports.authenticate = async (req,res,next)=>{
    try {
        let token;
    //check if token exists
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        res.status(401).json("Unauthorized");
        return next(new Error('Unauthorized'));
    }
    const decodedPayload = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const currentUser = await User.findById(decodedPayload.id);
    if(!currentUser){
        res.status(401).json("User with this token does not exist");
        return next(new Error('User with this token does not exist'));
    }
    //assign the current user to the req object in middleware header to be 
    //used anywhere globally where
    //authenticate middleware is used
    req.user = currentUser;
    next();
    } catch (err) {
        res.json(err);
    }
    

};