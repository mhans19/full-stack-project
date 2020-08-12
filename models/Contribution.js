const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contribution extends Model {}

Contribution.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      contribution_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contribution_hours: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contribution_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'project',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'contribution'
    }
  );

module.exports = Contribution;