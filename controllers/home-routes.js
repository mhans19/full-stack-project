//DEPENDENCIES
const router = require('express').Router();
const { Project, User, Contribution } = require('../models/Index');
// GET ALL
router.get('/', (req, res) => {
    console.log(req.session);
    Project.findAll({
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
                       'contribution_description',
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
        const projects = dbProjectData.map(project => project.get({ plain: true }));
        // pass a single project object into the homepage template
        res.render('homepage', {
          projects,
          loggedIn: req.session.loggedIn
        });
        router.get('/login', (req, res) => {
          res.render('login');
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// GET LOGIN
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
// GET SIGNUP
router.get('/signup', (req, res) => {
  if(req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  
  res.render('signup');
}); 

// GET ONE PROJECT  
  router.get('/project/:id', (req, res) => {
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
      include: [
        {
            model: Contribution,
            attributes: ['id', 
                         'contribution_type', 
                         'contribution_hours',
                         'contribution_description',
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
        if (!dbProjectData) {
          res.status(404).json({ message: 'No project found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbProjectData.get({ plain: true });
  
        // pass data to template
        res.render('single-project', {
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// MODULE EXPORTS  
  module.exports = router;