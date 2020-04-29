const mongoose = require('mongoose');
require('dotenv').config();

// an exercise
const ExerciseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  weight: {type: Number, min: 1, required: true},
  sets: {type: Number, min: 1, required: true},
  reps: {type: Number, min: 1, required: true},
  date: {type: Date, required: true}
});

// an exercise log 
const LogSchema = new mongoose.Schema({
  exercises: [ExerciseSchema],
  date: {type: Date, required: true},
  session: {type: String, required: true},
});

// add remainder of setup for slugs, connection, registering models, etc. below
mongoose.model('Exercise', ExerciseSchema);
mongoose.model('Log', LogSchema);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lifting-log', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});