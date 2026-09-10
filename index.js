const { loadEnvFile } = require('node:process');
const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require("./schemas/user");
const userRoutes = require("./routes/user");


const app = express();

//use userRoutes file for all "/user" requests
app.use('/user', userRoutes);

// port as defined in .env or 3001 by default
const port = process.env.PORT || 3001;
loadEnvFile();

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// //Create a new user
// app.post('/user', async (req, res) => { //route
//     //create user using mongoose schema
//     const encryptedPass = await bcrypt.hash(req.body.password, saltRounds=10)
//     const user = new User({
//         firstName:req.body.firstName,
//         lastName:req.body.lastName,
//         userName:req.body.userName,
//         password: encryptedPass,
//         bookings:req.body.bookings,
//         isActive:req.body.isActive
//     })

//     // save to database
//     user.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

// // get all users
// app.get('/user', (req, res) => {
//     User.find()
//         .then((result) => {
//         res.send(result)
//         })
//         .catch((err) => {
//         console.log(err);
//         })
    
// })

// // Get user by id
// app.get('/user/:id', (req, res) => {
//     User.findById(req.params.id)
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

// //TODO: update user by id
// app.patch('/user/:id', (req, res) => {
//     //update user by id, using information in body, return updated ("new") user instead of before update
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true} )
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

// // delete user by id
// app.delete('/user/:id', (req, res) => {
//     // find user by id sent in route params. Delete
//     User.findByIdAndDelete(req.params.id)
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })


