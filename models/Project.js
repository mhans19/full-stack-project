const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Project model
class Project extends Model {
    static uphours(body, models) {
      return models.Contribution.create({
        user_id: body.user_id,
        project_id: body.project_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.project_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }

// create fields/columns for Project model
Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
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
        contribution_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'contribution',
              key: 'id'
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'project'
    }
  );

  module.exports = Project;