const User = require("./User");
const Project = require("./Project");
const Contribution = require('./Contribution');
// create associations
// User Associations
User.hasMany(Project, {
    foreignKey: 'project_id'
});
User.hasMany(Contribution, {
    foreignKey: 'contribution_id'
});
// (through)
User.belongsToMany(Project, {
    through: Contribution,
    as: 'contributed_projects',
    foreignKey: 'user_id'
  });
// Project Associations
// (through)
Project.belongsToMany(User, {
  through: Contribution,
  as: 'contributed_projects',
  foreignKey: 'project_id'
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