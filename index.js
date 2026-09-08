const { loadEnvFile } = require('node:process');
const express = require('express');
const mongoose = require('./db/session');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const app = express();
// port as defined in .env or 3001 by default
const port = process.env.PORT || 3001;
loadEnvFile();

app.use(express.json());


// // Swagger setup
// const swaggerOptions = {
//   swaggerDefinition: {
//     myapi: '0.0.0',
//     info: {
//       title: 'My API',
//       version: '1.0.0',
//       description: 'API documentation',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3001',
//       },
//     ],
//   },
//   apis: [`${__dirname}/routes/*.js`], // files containing annotations as above 
// };

// console.log(`${__dirname}/routes/*.js`)

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    userName: String,
    password: String,
    bookings: [String],
    isActive: Boolean
})

const User = mongoose.model('User', UserSchema);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const testUser = new User({
//     firstName: "Test",
//     lastName: "Test",
//     userName: "Test",
//     password: "Test",
//     bookings: [],
//     isActive: true
// });

// testUser.save();



//Create a new user
app.post('/user', (req, res) => { //route
    //create user using mongoose schema
    const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.username,
        password:req.body.password, //TODO: HASH
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
app.get('/user', (req, res) => {
    User.find()
        .then((result) => {
        res.send(result)
        })
        .catch((err) => {
        console.log(err);
        })
    
})

// Get user by id
app.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

//TODO: update user by id
app.put('/user/:id', (req, res) => {

})

// delete user by id
app.delete('/user/:id', (req, res) => {
    // find user by id sent in route params. Delete
    User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})


