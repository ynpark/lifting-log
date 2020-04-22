const fs = require('fs');

class ExerciseIcon {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
}

function loadData(filePath, allData, cb) {
  fs.readFile(filePath, (err, jsonData) => {
    if(!err) {
      const data = JSON.parse(jsonData);
      console.log(data);
      data.exercises.forEach(exercise => {
        allData.push(new ExerciseIcon(exercise.name, exercise.icon));
      });
      console.log('all data:', allData);
      cb();
    } else {
      console.log('could not read', filePath);
      console.log(err);
    }
  });
}

module.exports = {
  ExerciseIcon: ExerciseIcon,
  loadData: loadData,
};