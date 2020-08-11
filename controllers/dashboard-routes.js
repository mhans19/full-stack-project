// DEPENDENCIES
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Project, User, Contribution } = require('../models');
// GET ALL FOR DASHBOARD
router.get('/', withAuth, (req, res) => {
  Project.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'description',
      'created_at'
    ],
    include: [
      {
        model: Contribution,
            attributes: ['id', 
                         'contribution_type', 
                         'contribution_hours',
                         'project_id', 
                         'user_id'
                        ],
            include: {
              model: User,
              attributes: ['username']
            }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbProjectData => {
      // serialize data before passing to template
      const projects = dbProjectData.map(project => project.get({ plain: true }));
      res.render('dashboard', { projects, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Project.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'title',
          'description',
          'created_at'
      ],
      include: [{
                model: Contribution,
                attributes: ['id', 
                            'contribution_type', 
                            'contribution_hours',
                            'project_id', 
                            'user_id'
                            ],
                include: {
                model: User,
                attributes: ['username']
                }
          },
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
  .then(dbProjectData => {
      const project = dbProjectData.get({ plain: true });
  
      res.render('edit-project', {
          project,
          loggedIn: true
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
// EXPORT MODULE
module.exports = router;