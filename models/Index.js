const User = require("./User");
const Project = require("./Project");
const Contribution = require('./Contribution');
// Create Associations
User.hasMany(Project, {
  foreignKey: 'user_id'
});
Project.belongsTo(User, {
  foreignKey: 'user_id'
}); 

Contribution.belongsTo(User, {
foreignKey: 'user_id'
});

Contribution.belongsTo(Project, {
foreignKey: 'project_id'
});

User.hasMany(Contribution, {
foreignKey: 'user_id'
});

Project.hasMany(Contribution, {
foreignKey: 'project_id'
});


// EXPORT MODULE
module.exports = { User, Project, Contribution };