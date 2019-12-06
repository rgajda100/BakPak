const bcrypt = require('bcrypt');
const saltRounds = 10;
'use strict';
module.exports = (sequelize, DataTypes) => {
  //Table Column Description
  //firstname: Holds first name of account
  //lastname: Holds last name of account
  //phone: Holds phone number for account
  //email: Holds email for account
  //password: Holds password (bcrypt hashed) for account
  const Student = sequelize.define('Student', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {type: DataTypes.STRING, primaryKey: true},
    college: DataTypes.STRING,
    password: DataTypes.TEXT,
  }, {});

  Student.beforeSave((student, options)=> {
      if (student.changed('password')) {
          student.password = bcrypt.hashSync(student.password, bcrypt.genSaltSync(10), null);
      }
  });

  Student.prototype.comparePassword = function(input, cb){
    bcrypt.compare(input, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };

  Student.associate = function(models) {

  };
  return Student;
};