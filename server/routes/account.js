const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

router.post('/signup', (req, res, next) => {
   let user = new User();
   user.name = req.body.name;
   user.email = req.body.email;
   user.password = req.body.password;
   user.picture = user.gravatar();
   user.isSeller = req.body.isSeller;

   User.findOne({email: user.email}, (err, existingUser) => {
       if (existingUser){
           res.json({
               success: false,
               Message: 'Email already used by another account.'
           });
       }
       else {
           user.save();
           const token = jwt.sign({
               user: user
           }, config.secret, {
               expiresIn: '7d'
           });
           res.json({
               success: true,
               message: 'Successfully registered.',
               token: token
           });
       }
   });
});

router.post('/login', (req, res, next) => {
    User.findOne({email:req.body.email}, (err, user) => {
        if (err) throw err;

        if (!user){
            return res.json({
                success: false,
                message: "Authentication failed, User doesn't exist."
            });
        }

        let validPassword = user.comparePassword(req.body.password);
        if (!validPassword){
            return res.json({
                success: false,
                message: "Authentication failed, Wrong password."
            });
        }

        const token = jwt.sign({
            user: user
        }, config.secret, {
            expiresIn: '7d'
        });

        return res.json({
            success: true,
            message: "Successfully logged in!",
            token: token
        });
    });
});

module.exports = router;
