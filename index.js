// implement your API   
const express = require('express');
const server = express();

server.use(express.json());

const Users = require('./data/db');

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


// add / insert

server.post('/api/users', (request, response) => {
    const userData = request.body;


    Users.insert(userData)
    .then(added => {
        response.status(201).json(added);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({errorMessage: 'Sorry, we ran into an error adding a user.'})
    })

})

// remove

server.delete('/api/users/:id', (request, response) => {
    const id = request.params.id

    Users.remove(id)
    .then(removed => {
        response.status(204).json(removed);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({errorMessage: 'Sorry, we ran into an error removing a user.'})
    })

})

// .put/.update


server.put('/api/users/:id', (request, response) => {
    const id = request.params.id
    const userData = request.body;

    Users.update(id, userData)

    .then(updated => {
        response.status(204).json(updated);
    })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({errorMessage: 'Sorry, we ran into an error updating a user.'})
    })

})


const port = 9000;
server.listen(port, () => console.log(`API ONLINE ON PORT ${port}`));