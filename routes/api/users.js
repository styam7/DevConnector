const express = require('express');
const res = require('express/lib/response');
const User = require('../../models/User');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
const { check , validationResult  } = require('express-validator')

// @route    POST api/register
// @desc     Register route
// @access   Public
router.post("/" ,[
check('name', 'Name is required').not().isEmpty(),
check('email', 'Not a valid email').isEmail(),
check('password', "Please enter a password with 6 or more characters").isLength({min: 6})
],
 async (req, res) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
     }

     try {
         //see if user exists
         let { name, email, password } = req.body
         let user = await User.findOne({ email })
         if(user){
            return res.status(400).json({errors: [ { msg: "User already exists"}]})
         }
        // generate user gravatar

        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm',
        });

        user = new User({
            name,
            email,
            avatar,
            password,
        })

        //encrypt password

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

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