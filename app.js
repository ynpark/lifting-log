require('./db');

const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');

const express = require('express');
const app = express();
const path = require('path');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

// body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret for signing session id',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

app.get('/', (req, res) => {
  let obj = {};
  const name = req.query.name;
  const oneRepMax = req.query.oneRepMax;
  const percentile = req.query.percentile;
  const goal = req.query.goal;

  if(Object.prototype.hasOwnProperty.call(req.query, 'name') && name){
    obj['name'] = name;
  }

  if(Object.prototype.hasOwnProperty.call(req.query, 'oneRepMax') && oneRepMax) {
    obj['oneRepMax'] = oneRepMax;
  }

  if(Object.prototype.hasOwnProperty.call(req.query, 'percentile') && percentile) {
    obj['percentile'] = percentile;
  }

  if(Object.prototype.hasOwnProperty.call(req.query, 'goal') && goal) {
    obj['goal'] = goal;
  }

  Exercise.find(obj, (err, result, count) => {
    res.render('exercises', { exercises: result });
  })
});

const port = 3000;
app.listen(port);
console.log(`listening on port ${port}`);