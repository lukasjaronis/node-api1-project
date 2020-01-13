// implement your API   
const express = require('express');
const server = express();

server.use(express.json());

const Users = require('./data/db');

server.get('/', function(request, response) {
    response.send({data: 'all the data'})
})

// get
server.get('/api/users', (request, response) => {

    Users.find() // return a promise
    .then(users => {
        response.status(300).json(users);
    })
    .catch(error => {
        console.log(error)
        response.status(500).json({
            errorMessage: 'Sorry, we ran into an error GETTING the list of users'
        })
    })
})

const port = 9000;
server.listen(port, () => console.log(`API ONLINE ON PORT ${port}`));