require('../db');
const mongoose = require('mongoose');
const ExerciseModel = mongoose.model('Exercise');
const exerciseData = { name: 'Squat', weight: 165, sets: 5, reps: 10, date: new Date('2020-04-01T00:00:00.000Z')};

describe('Exercise Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/lifting-log', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save exercise successfully', async () => {
        const validExercise = new ExerciseModel(exerciseData);
        const savedExercise = await validExercise.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedExercise._id).toBeDefined();
        expect(savedExercise.name).toBe(exerciseData.name);
        expect(savedExercise.weight).toBe(exerciseData.weight);
        expect(savedExercise.sets).toBe(exerciseData.sets);
        expect(savedExercise.reps).toBe(exerciseData.reps);
        expect(savedExercise.date).toBe(exerciseData.date);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert exercise successfully, but the field does not defined in schema should be undefined', async () => {
        const exerciseWithInvalidField = new ExerciseModel({ name: 'Squat', weight: 165, sets: 5, reps: 10, date: new Date('2020-04-01T00:00:00.000Z'), goal: 200 });
        const savedExerciseWithInvalidField = await exerciseWithInvalidField.save();
        expect(savedExerciseWithInvalidField._id).toBeDefined();
        expect(savedExerciseWithInvalidField.goal).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on weight field.
    it('create exercise without required field should failed', async () => {
        const exerciseWithoutRequiredField = new ExerciseModel({ name: 'Squat' });
        let err;
        try {
            const savedExerciseWithoutRequiredField = await exerciseWithoutRequiredField.save();
            err = savedExerciseWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.weight).toBeDefined();
        expect(err.errors.reps).toBeDefined();
        expect(err.errors.sets).toBeDefined();
        expect(err.errors.date).toBeDefined();
    });    
});