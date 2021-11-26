const express = require('express'); //declare express as express dependencies is required

const bodyParser = require('body-parser'); //declare bodyParser to define our req.body in request

const { randomBytes } = require('crypto'); //declare randomBytes to generate id in hex whenever there is new posts create

const app = express(); //declare app to use express 
app.use(bodyParser.json()); //make express app to use bodyparser json format

const posts = {}; //declare an object called posts to store all posts we have create

app.get('/posts', (req, res) => {
    res.send(posts); //respond back all the data store inside posts object 
}); //route handler to handle request and respond for get request 

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex'); //post id will randomly generate and change to string 
    const { title } = req.body; // take a look body inside req 

    posts[id] = {
        id, title
    };//store id and title inside posts object

    res.status(201).send(posts[id]); //respond back new data store inside posts object with status code 201

}); //route handler to handle request and respond for post request 

app.listen(4000, () => {
   console.log('Listening on 4000'); 
}); //initialize the port 4000 in server for this service