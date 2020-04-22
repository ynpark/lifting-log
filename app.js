require('./db');
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');

const express = require('express');
const app = express();
const path = require('path');

const { loadData } = require('./util');
const exercises = [];

// serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

// body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerHelper('normalize', function (str) {
  return str.replace(/ /g, '-').toLowerCase();
})

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret for signing session id',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

// middleware to normalize input
app.use(function(req, res, next) {
  for (let key in req.query){ 
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

app.get('/', (req, res) => {
  let result = exercises;
  if(Object.prototype.hasOwnProperty.call(req.query, 'exerciseQuery') && req.query.exerciseQuery) {
    result = exercises.filter(exercise => exercise.name.toLowerCase().includes(req.query.exerciseQuery));
  }
  res.render('home', { exercises: result });
});

app.get('/tracker', (req, res) => {
  // let obj = {};
  // const name = req.query.name;
  // const weight = req.query.weight;
  // const sets = req.query.sets;
  // const reps = req.query.reps;
  // obj[name] = name;
  // obj[weight] = weight;
  // obj[sets] = sets;
  // obj[reps] = reps;
  // Exercise.find(obj, (err, result, count) => {
  //   res.render('tracker', { myExercises: result });
  // })
  const exercises = req.session.myExercises || [];
  res.render('tracker', { myExercises: exercises });
});

app.get('/log-bench-press', (req, res) => {
  res.render('log', { exercise: 'bench-press'});
});

app.get('/log-squat', (req, res) => {
  res.render('log', { exercise: 'squat'});
});

app.get('/log-deadlift', (req, res) => {
  res.render('log', { exercise: 'deadlift'});
});

app.get('/log-shoulder-press', (req, res) => {
  res.render('log', { exercise: 'shoulder-press'});
});

app.get('/log-bent-over-row', (req, res) => {
  res.render('log', { exercise: 'bent-over-row'});
});

app.get('/log-front-squat', (req, res) => {
  res.render('log', { exercise: 'front-squat'}); 
});

app.get('/log-incline-bench-press', (req, res) => {
  res.render('log', { exercise: 'incline-bench-press'}); 
});

app.get('/log-decline-bench-press', (req, res) => {
  res.render('log', { exercise: 'decline-bench-press'});
});

app.get('/log-dumbbell-row', (req, res) => {
  res.render('log', { exercise: 'dumbbell-row'});
});

app.get('/log-dumbbell-lateral-raise', (req, res) => {
  res.render('log', { exercise: 'dumbbell-lateral-raise'});
});

app.post('/log-bench-press', (req, res) => {
  new Exercise({
    name: 'Bench Press',
    weight: req.body.weight,
    sets: req.body.sets,
    reps: req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-squat', (req, res) => {
  new Exercise({
    name : 'Squat',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-deadlift', (req, res) => {
  new Exercise({
    name : 'Deadlift',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-shoulder-press', (req, res) => {
  new Exercise({
    name : 'Shoulder Press',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-bent-over-row', (req, res) => {
  new Exercise({
    name : 'Bent Over Row',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-front-squat', (req, res) => {
  new Exercise({
    name : 'Front Squat',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-incline-bench-press', (req, res) => {
  new Exercise({
    name : 'Incline Bench Press',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-decline-bench-press', (req, res) => {
  new Exercise({
    name : 'Decline Bench Press',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-dumbbell-row', (req, res) => {
  new Exercise({
    name : 'Dumbbell Row',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

app.post('/log-dumbbell-lateral-raise', (req, res) => {
  new Exercise({
    name : 'Dumbbell Lateral Raise',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps
  }).save(function(err, savedExercise, count){
    if(!req.session.myExercises){
      req.session.myExercises = [];
    }
    req.session.myExercises.push(savedExercise);
    res.redirect('/tracker');
  })
});

const dataPath = path.join(__dirname, 'data.json');

loadData(dataPath, exercises, () => {
  console.log(exercises);
  console.log(`loaded ${exercises.length} images`);

  const port = 3000;
  app.listen(port);

  console.log(`server started on port ${port}`);
});