const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./posts/postRouter');
//const userR = require( './users/userRouter.js')
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use(express.json());
server.use(morgan('dev'))
server.use(helmet());
server.use('/api',routes);

server.use(logger);


//custom middleware


function logger(req, res, next) {
  console.log(`${req.method} request`)
  next();
};

module.exports = server;
