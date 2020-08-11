const User = require("./User");
const Project = require("./Project");
const Contribution = require('./Contribution');
// Create Associations
// User Associations
User.hasMany(Project, {
  foreignKey: 'user_id'
});
User.hasMany(Contribution, {
  foreignKey: 'user_id'
  });
// Project Associations
Project.belongsTo(User, {
  foreignKey: 'user_id'
}); 
Project.hasMany(Contribution, {
  foreignKey: 'project_id'
  });
// Contribution Associations
Contribution.belongsTo(User, {
foreignKey: 'user_id'
});
Contribution.belongsTo(Project, {
foreignKey: 'project_id'
});

// EXPORT MODULE
module.exports = { User, Project, Contribution };