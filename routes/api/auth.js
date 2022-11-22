const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check , validationResult  } = require('express-validator')

// @route    GET api/auth
// @desc     test route
// @access   Public
router.get("/" , auth , async (req, res) => {
    try {
       const user = await User.findById(req.user.id)
       res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg: 'Server error'})
    }
})
// @route    POST api/auth
// @desc     Login route
// @access   Public
router.post("/login" ,[
    check('email', 'Not a valid email').isEmail(),
    check('password', "Password is required").exists()
    ],
     async (req, res) => {
         const errors = validationResult(req)
         if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
         }
    
         try {
             //see if user exists
             let { email, password } = req.body
             let user = await User.findOne({ email })
             if(!user){
                return res.status(400).json({errors: [ { msg: "Invalid Credential"}]})
             }
           
            // match password

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({errors: [ { msg: "Invalid Credential"}]})
             }


            //json web token 
    
            const payload ={
                user:{
                    id: user.id
                }
            }
            
            jwt.sign(payload, config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token})
            })
         } catch (error) {
             console.error(error.message)
             res.status(500).send('Server error')
         }
    })


module.exports = router;