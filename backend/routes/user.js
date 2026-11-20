const bcrypt = require('bcrypt');
const User = require("../schemas/user");
const express = require('express');
const jwt = require('jsonwebtoken');

// create router that can be exported and used by index.js (otherwise all these routes will be inaccesible from the main index.js file)
const router = express.Router();


router.use(express.json());

//Create a new user
router.post('/', async (req, res) => { //route
    const encryptedPass = await bcrypt.hash(req.body.password, 10)
    //create user using mongoose schema
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

// User login authentication
router.post('/login', async (req, res) => {
  try{
  //get username and password entered by user
  const userName = req.body.userName;
  const password = req.body.password;

  // find user in database. sets user to null if not found
  const user = await User.findOne({ userName : userName });

  if (user) {
    // compare passwords using bycrypt, return error if they don't match
      if (await bcrypt.compare(password, user.password)){
        // if passwords match generate tokens
        const accessToken = jwt.sign(
          { sub: user._id.toString() },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: '15m'}
        );


        // Return access token, set refresh token (cookie)

      }

      else{
        // passwords didn't match
        return res.status(401).json({
          message: "Invalid username or password."
        });
      }
        
  }

  else {
    // username can't be found in database
    return res.status(401).json({
      message: "Invalid username or password."
    });
  }
} catch (error){
  console.error("Login error: ", error);
  return res.status(500).json;({
    message: "An unexpected error has occurred"
  })
}

 
})


module.exports = router;