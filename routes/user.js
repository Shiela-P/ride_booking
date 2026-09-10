const bcrypt = require('bcrypt');
const User = require("../schemas/user");
const express = require('express');

// create router that can be exported and used by index.js (otherwise all these routes will be inaccesible from the main index.js file)
const router = express.Router();


router.use(express.json());

//Create a new user
router.post('/', async (req, res) => { //route
    //create user using mongoose schema
    const encryptedPass = await bcrypt.hash(req.body.password, saltRounds=10)
    const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        password: encryptedPass,
        bookings:req.body.bookings,
        isActive:req.body.isActive
    })

    // save to database
    user.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

// get all users
router.get('/', (req, res) => {
    User.find()
        .then((result) => {
        res.send(result)
        })
        .catch((err) => {
        console.log(err);
        })
    
})

// Get user by id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

router.patch('/:id', (req, res) => {
    //update user by id, using information in body, return updated ("new") user instead of before update
    User.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

// delete user by id
router.delete('/:id', (req, res) => {
    // find user by id sent in route params. Delete
    User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})


module.exports = router;