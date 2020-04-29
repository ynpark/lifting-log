require('../db');
const mongoose = require('mongoose');
const LogModel = mongoose.model('Log');
const ExerciseModel = mongoose.model('Exercise');
const exercise1 = new ExerciseModel({ name: 'Squat', weight: 165, sets: 5, reps: 10, date: new Date('2020-04-01T00:00:00.000Z') });
const exercise2 = new ExerciseModel({ name: 'Bench Press', weight: 100, sets: 5, reps: 5, date: new Date('2020-04-01T00:00:00.000Z') });
const exerciseArr = [];
exerciseArr.push(exercise1, exercise2);
const logData = { exercises: exerciseArr, date: new Date('2020-04-01T00:00:00.000Z'), session: 'x1y2z3'};

describe('Log Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/lifting-log', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save log successfully', async () => {
        const validLog = new LogModel(logData);
        const savedLog = await validLog.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedLog._id).toBeDefined();
        expect(savedLog.date).toBe(logData.date);
        expect(savedLog.session).toBe(logData.session);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert log successfully, but the field does not defined in schema should be undefined', async () => {
        const logWithInvalidField = new LogModel({ exercises: exerciseArr, date: new Date('2020-04-01T00:00:00.000Z'), session: 'x1y2z3', goal: 200 });
        const savedLogWithInvalidField = await logWithInvalidField.save();
        expect(savedLogWithInvalidField._id).toBeDefined();
        expect(savedLogWithInvalidField.goal).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should have told us the errors in the date field
    it('create log without required field should failed', async () => {
        const logWithoutRequiredField = new LogModel({ exercises: exerciseArr });
        let err;
        try {
            const savedLogWithoutRequiredField = await logWithoutRequiredField.save();
            err = savedLogWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.date).toBeDefined();
        expect(err.errors.session).toBeDefined();
    });    
});