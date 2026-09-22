const Ride = require("../schemas/ride");
const express = require('express');

// the router to give to index.js
const router = express.Router();

// makes JSON bodies accesible through req.body
router.use(express.json());

//create a new ride
router.post ("/", (req, res) => {
    const ride = new Ride({
        name: req.body.name,
        description: req.body.description,
        times: req.body.times,
        isAcive: req.body.isAcive
    })

    // save to database
    ride.save()
    .then((result) => {
        res.statusCode = 201
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

//get all rides
router.get('/', (req, res) => {
    Ride.find()
        .then((result) => {
        res.send(result)
        })
        .catch((err) => {
        console.log(err);
        })
})

router.patch('/:id', (req, res) => {
    Ride.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

router.delete('/:id', (req, res) => {
    Ride.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;