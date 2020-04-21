require('./db');
const mongoose = require('mongoose');
//const Exercise = mongoose.model('Exercise');

const express = require('express');
const app = express();
const path = require('path');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { loadData, Exercise } = require('./util');
const exercises = [];
const myExercises = [];

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

// app.get('/', (req, res) => {
//   let obj = {};
//   const name = req.query.name;
//   const oneRepMax = req.query.oneRepMax;
//   const percentile = req.query.percentile;
//   const goal = req.query.goal;

//   if(Object.prototype.hasOwnProperty.call(req.query, 'name') && name){
//     obj['name'] = name;
//   }

//   if(Object.prototype.hasOwnProperty.call(req.query, 'oneRepMax') && oneRepMax) {
//     obj['oneRepMax'] = oneRepMax;
//   }

//   if(Object.prototype.hasOwnProperty.call(req.query, 'percentile') && percentile) {
//     obj['percentile'] = percentile;
//   }

//   if(Object.prototype.hasOwnProperty.call(req.query, 'goal') && goal) {
//     obj['goal'] = goal;
//   }

//   Exercise.find(obj, (err, result, count) => {
//     res.render('exercises', { exercises: result });
//   })
// });

app.get('/', (req, res) => {
  let result = exercises;
  if(Object.prototype.hasOwnProperty.call(req.query, 'exerciseQuery') && req.query.exerciseQuery) {
    result = exercises.filter(exercise => exercise.name.toLowerCase().includes(req.query.exerciseQuery));
  }
  res.render('home', { exercises: result });
});

app.get('/tracker', (req, res) => {
  res.render('tracker', { myExercises: myExercises });
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
  if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Bench Press';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-squat', (req, res) => {
  if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Squat';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-deadlift', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Deadlift';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-shoulder-press', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Shoulder Press';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-bent-over-row', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Bent Over Row';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-front-squat', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Front Squat';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-incline-bench-press', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Incline Bench Press';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-decline-bench-press', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Decline Bench Press';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-dumbbell-row', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Dumbbell Row';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

app.post('/log-dumbbell-lateral-raise', (req, res) => {
    if(req.body.weight && req.body.sets && req.body.reps){
    const obj = [];
    obj.name = 'Dumbbell Lateral Raise';
    obj.weight = req.body.weight;
    obj.sets = req.body.sets;
    obj.reps = req.body.reps;
    myExercises.push(obj);
  }
  res.redirect('/tracker');
});

const dataPath = path.join(__dirname, 'data.json');

loadData(dataPath, exercises, () => {
  console.log(exercises);
  console.log(`loaded ${exercises.length} images`);

  const port = 3000;
  app.listen(port);

  console.log(`server started on port ${port}`);
});