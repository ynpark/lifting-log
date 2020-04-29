require('./db');
const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const Exercise = mongoose.model('Exercise');

const express = require('express');
const app = express();
const path = require('path');

const { loadData } = require('./util');
const exercises = [];

// enable sessions 
const session = require('express-session');
const sessionOptions = {
  secret: 'secret for storing session id',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};
app.use(session(sessionOptions));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerHelper('normalize', function (str) {
  return str.replace(/ /g, '-').toLowerCase();
});
hbs.registerHelper('format', function (date) {
  return date.toISOString().split('T')[0];
});

// middleware to normalize input
app.use(function (req, res, next) {
  for (const key in req.query){ 
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

app.get('/', (req, res) => {
  let result = exercises;
  if(Object.prototype.hasOwnProperty.call(req.query, 'exerciseQuery') && req.query.exerciseQuery) {
    result = exercises.filter(exercise => exercise.name.toLowerCase().includes(req.query.exerciseQuery));
  }

  let env = 'https://lifting-log.herokuapp.com';
  if (app.get('env') === 'development') { // if context is local
    env = 'http://localhost:8000';
  } 

  res.render('search', { exercises: result, env: env });
});

app.get('/tracker', (req, res) => {
  Log.find({ session : req.session.id }).lean().exec((err, docs) => {
    const exercises = docs.map(log => log.exercises) || [];
    const merged = [].concat.apply([], exercises);
    let result = merged;
    if (Object.prototype.hasOwnProperty.call(req.query, 'logStart') && req.query.logStart
      && Object.prototype.hasOwnProperty.call(req.query, 'logEnd') && req.query.logEnd) {
      result = merged.filter(exercise => 
        exercise.date.getTime() >= new Date(req.query.logStart + 'T00:00:00Z').getTime() 
        && exercise.date.getTime() <= new Date(req.query.logEnd + 'T00:00:00Z').getTime());
    }
    res.render('tracker', { myExercises: result });
  });

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
    reps: req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-squat', (req, res) => {
  new Exercise({
    name : 'Squat',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-deadlift', (req, res) => {
  new Exercise({
    name : 'Deadlift',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-shoulder-press', (req, res) => {
  new Exercise({
    name : 'Shoulder Press',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-bent-over-row', (req, res) => {
  new Exercise({
    name : 'Bent Over Row',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-front-squat', (req, res) => {
  new Exercise({
    name : 'Front Squat',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-incline-bench-press', (req, res) => {
  new Exercise({
    name : 'Incline Bench Press',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-decline-bench-press', (req, res) => {
  new Exercise({
    name : 'Decline Bench Press',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-dumbbell-row', (req, res) => {
  new Exercise({
    name : 'Dumbbell Row',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

app.post('/log-dumbbell-lateral-raise', (req, res) => {
  new Exercise({
    name : 'Dumbbell Lateral Raise',
    weight : req.body.weight,
    sets : req.body.sets,
    reps : req.body.reps,
    date : req.body.date
  }).save(function(err, savedExercise){
    const obj = {};
    obj.date = req.body.date;
    obj.session = req.session.id;
    Log.findOne(obj, (err, result) => {
      if(!result){
        const exerciseArr = [];
        exerciseArr.push(savedExercise);
        new Log({
          exercises: exerciseArr,
          date: obj.date,
          session: obj.session
        }).save();
      }else{
        result.exercises.push(savedExercise);
        result.save();
      }
      res.redirect('/tracker');
    });
  });
});

const dataPath = path.join(__dirname, 'data.json');

loadData(dataPath, exercises, () => {
  console.log(exercises);
  console.log(`loaded ${exercises.length} images`);

  const port = process.env.PORT || 8000;
  app.listen(port);
  console.log(`server started on port ${port}`);
});

module.exports = { app };