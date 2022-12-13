//CRUD UPRATION

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Users = require('./users')

app.use(express.json())

//CREAT USERS

app.post('/users/add', (req, res) => {
    const user = {
        id: Users.id + 1,
        username: req.body.username,
        city: req.body.city,
    };

    Users.push(user);
    res.send(Users)
})

//READ USERS

app.get('/users', (req, res) => {
    res.status(200).send(Users)
});


//UPDATE
app.put('/users/update/:id', (req, res) => {
    const user = Users.find((u) => u.id === Number(req.params.id) );
    if (!user) {
        res.status(400).send(`no user with the following id: ${req.params.id} exit `)
    };

   user.username = req.body.username;
   user.city = req.body.city;
   
    res.send(Users);

});


//DELETE USERS

app.delete('/users/:id', (req, res) => {
    const user = Users.find((u) => u.id === Number(req.params.id))
    if (!user) {
        res.status(400).send(`no user witth this id: ${req.params.id} exit `)
    }

    const index = Users.indexOf(user);
    user.splice(index, 1)

    res.send(Users)
})


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }

    console.log(`server runninng on port ${PORT}`)
})