const express = require('express'); //declare express as express dependencies is required

const bodyParser = require('body-parser'); //declare bodyParser to define our req.body in request

const { randomBytes } = require('crypto'); //declare randomBytes to generate id in hex whenever there is new posts create

const commentsByPostId = {}; //declare an object called commentsByPostId to store all comments we have create under associated postsid

const app = express(); //declare app to use express 
app.use(bodyParser.json()); //make express app to use bodyparser json format

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []); //respond back all the data store inside commentsByPostId object associated with postid
}); //route handler to handle request and respond for get request 

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex'); //comment id will randomly generate and change to string 
    const { content } = req.body; // take a look body inside req 

    const comments = commentsByPostId[req.params.id] || []; //declare comments to check the object commentsByPostId that have any array inside or not, || is to handle undefied array
    
    comments.push({ id: commentId, content }); // Push commentId and content inside this comments array
    commentsByPostId[req.params.id] = comments; // Assign that comments array to its original commentsByPostid object

    res.status(201).send(comments); //respond back new data store inside comments object with status code 201

}); //route handler to handle request and respond for post request 

app.listen(4001, () => {
    console.log('Listening on 4001'); 
 }); //initialize the port 4001 in server for this service