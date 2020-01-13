// implement your API
const express = require("express");
const server = express();

server.use(express.json());

const Users = require("./data/db");

// get
server.get("/api/users", (request, response) => {
  Users.find() // return a promise
    .then(users => {
      response.status(300).json(users);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        errorMessage: "Sorry, we ran into an error GETTING the list of users"
      });
    });
});

// find by id

server.get("/api/users/:id", (request, response) => {
  const id = request.params.id;


  Users.findById(id)
  .then(findingById => {
      if(findingById) {
          response.status(200).json(findingById)
      } else {
          response.status(404).json({
              errorMessage: 'The user with the specified ID does not exist.'
          })
      }
  })
  .catch(error => {
      response.status(500).json({
        errorMessage: 'The user information could not be retrieved.', error
      })
  })
 
});

// add / insert

server.post("/api/users", (request, response) => {
  const userData = request.body;
  const { name, bio } = request.body;
  console.log(userData);

  if (!name || !bio) {
    response.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    Users.insert(userData)
      .then(added => {
        response.status(201).json(added);
      })
      .catch(error => {
        console.log(error);

        response
          .status(500)
          .json({ errorMessage: "Sorry, we ran into an error adding user." });
      });
  }
});

// remove

server.delete("/api/users/:id", (request, response) => {
  const id = request.params.id;

  Users.remove(id)
    .then(removed => {
      response.status(204).json(removed);
    })
    .catch(error => {
      console.log(error);
      //handle the error
      response
        .status(500)
        .json({ errorMessage: "Sorry, we ran into an error removing a user." });
    });
});

// .put/.update

server.put("/api/users/:id", (request, response) => {
  const id = request.params.id;
  const userData = request.body;

  Users.update(id, userData)

    .then(updated => {
      response.status(204).json(updated);
    })
    .catch(error => {
      console.log(error);
      //handle the error
      response
        .status(500)
        .json({ errorMessage: "Sorry, we ran into an error updating a user." });
    });
});

const port = 9000;
server.listen(port, () => console.log(`API ONLINE ON PORT ${port}`));
