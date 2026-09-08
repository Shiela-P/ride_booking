

app.post('/user', (req, res) => {
    const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.username,
        password:req.body.password, //TODO: HASH
        bookings:req.body.bookings,
        isActive:req.body.isActive
    })

    user.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})


app.get('/user', (req, res) => {
    res.send(200)
})
