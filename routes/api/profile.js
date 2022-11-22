const express = require('express');
const request = require('request')
const auth = require('../../middleware/auth')
const router = express.Router();
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator');


// @route    GET api/profile/me
// @desc     get current user profile
// @access   Private

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).send({ msg: 'There is no profile for this user' })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

// @route    Post api/profile
// @desc     Create and update user profile
// @access   Private

router.post("/", [
    auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty(),
        check('githubusername', 'github username is required').not().isEmpty(),
    ]
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { company,
            website,
            location,
            bio, 
            status,
            githubusername,
            skills, 
            youtube,
            facebook, 
            twitter, 
            linkedin, 
            instagram } = req.body

            //build profile object
            const profilefields = {}
            profilefields.user = req.user.id;
            if(company) profilefields.company = company;
            if(website) profilefields.website = website;
            if(location) profilefields.location = location;
            if(bio) profilefields.bio = bio;
            if(status) profilefields.status = status;
            if(githubusername) profilefields.githubusername = githubusername;
            if(skills){
                profilefields.skills = skills.split(',').map(skill => skill.trim());
            }

            //build social object
            profilefields.social ={}
            if(facebook) profilefields.social.facebook = facebook;
            if(youtube) profilefields.social.youtube = youtube;
            if(twitter) profilefields.social.twitter = twitter;
            if(linkedin) profilefields.social.linkedin = linkedin;
            if(instagram) profilefields.social.instagram = instagram;
        try {
            let profile = await Profile.findOne({user: req.user.id })
            
            //update profile if found
            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profilefields},
                    {new: true}
                );
                return res.json(profile)
            }
            //create profile
            profile = new Profile(profilefields)
            await profile.save()
            res.json(profile)

        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error')
        }
    })

// @route    GET api/profile/allusers
// @desc     Get all profiles
// @access   Public

router.get("/allusers", async (req, res) =>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

// @route    GET api/profile/user/user_id
// @desc     Get profile by ID
// @access   Public

router.get("/user/:user_id", async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if(!profile) return res.status(400).json({msg: 'Profile not found'})
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send('Server error')
    }
})


// @route    DELETE api/profile
// @desc     Delete profile & user
// @access   Private

router.delete("/deleteuser", auth, async (req, res) =>{
    try {
        //delete profile
        await Profile.findOneAndRemove({user: req.user.id})
        //delete user
        await User.findOneAndRemove({ _id: req.user.id})
        res.json({msg: 'User Deleted'})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})


// @route    Put api/profile/experience
// @desc     add experience
// @access   Private

router.put('/experience', 
[auth,
    [
       check('title', "title is required").not().isEmpty(),
       check('company', "Company is required").not().isEmpty(),
       check('from', "From date is required").not().isEmpty()      
    ]
], async ( req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { title, company, location, from, to, current, description } = req.body
    const newExp = {
        title, company, location, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.experience.unshift(newExp)

        await profile.save()

        res.json(profile)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }

})


// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience
// @access   Private

router.delete("/experience/:exp_id", auth, async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex, 1);

        await profile.save()

        res.json(profile)       
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})


// @route    Put api/profile/education
// @desc     add education
// @access   Private

router.put('/education', 
[auth,
    [
       check('school', "school is required").not().isEmpty(),
       check('degree', "degree is required").not().isEmpty(),
       check('fieldofstudy', "fieldofstudy is required").not().isEmpty(),
       check('from', "From date is required").not().isEmpty()      
    ]
], async ( req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body
    const newEdu = {
        school, degree, fieldofstudy, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.education.unshift(newEdu)

        await profile.save()

        res.json(profile)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }

})

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience
// @access   Private

router.delete("/education/:edu_id", auth, async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1);

        await profile.save()

        res.json(profile)       
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

// @route    GET api/profile/github/:username
// @desc     Get user repos from github
// @access   Public

router.get("/github/:username", async (req, res) => {
    try {
        const options = {
            headers: { 'user-agent': 'node.js'},
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
            method: "GET",            
        }
        await request(options, (error, response, body) =>{
            if(error) console.error(error)

            if(response.statusCode !== 200){
                return res.status(404).json({msg: "No github profile found"})
            }
            const result = JSON.parse(body)
            res.json(result)
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

module.exports = router;