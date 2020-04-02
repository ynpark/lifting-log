// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
const urlSlugs = require('mongoose-url-slugs')

// users
// * our site requires authentication...
// * so users have a username and password
// * they can have 0 or more exercises (e.g. bench press, deadlift, squat)
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  gender: {type: String, required: true},
  bodyweight: {type: Number, required: true},
  exercises:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
});

// an exercise
// * each exercise must have an associated user
// * includes the name of the exercise and the user's training logs associated with the exercise
// * records the user's one rep max and uses it to calculate their percentile
// * user can set a goal for the exercise
const Exercise = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  logs: [Log]
  oneRepMax: {type: Number, default: 0, required: true},
  percentile: {type: Number, default: 100, required: true},
  goal: {type: Number, required: false}
});

// a training log 
// * each log must have an associated exercise
// * includes the date, number of sets, number of reps, and weight used
// * track progress by sorting logs by date 
const Log = new mongoose.Schema({
  exercise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
  createdAt: {type: Date, required: true},
  sets: {type: Number, min: 1, required: true},
  reps: {type: Number, min: 1, required: true},
  weight: {type: Number, min: 1, required: true}
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below
mongoose.model('User', User);
mongoose.model('Exercise', Exercise);
mongoose.model('Log', Log);
//mongoose.connect('mongodb://localhost/lifting-log');