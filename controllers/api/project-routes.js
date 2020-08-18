const router = require('express').Router();
const { Project, User, Contribution } = require('../../models/Index');
const withAuth = require('../../utils/auth');

// get all projects
router.get('/', (req, res) => {
    Project.findAll({
            attributes: [
                'id',
                'title',
                'description',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
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
        .then(dbProjectData => res.json(dbProjectData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get one project
router.get('/:id', (req, res) => {
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
                res.status(404).json({
                    message: 'No project found with this id'
                });
                return;
            }
            res.json(dbProjectData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a project
router.post('/', withAuth, (req, res) => {
    Project.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        })
        .then(dbProjectData => res.json(dbProjectData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update a project
router.put('/:id', withAuth, (req, res) => {
    Project.update({
            title: req.body.title,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbProjectData => {
            if (!dbProjectData) {
                res.status(404).json({
                    message: 'No project found with this id'
                });
                return;
            }
            res.json(dbProjectData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a project
router.delete('/:id', withAuth, (req, res) => {
    Project.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbProjectData => {
            if (!dbProjectData) {
                res.status(404).json({
                    message: 'No project found with this id'
                });
                return;
            }
            res.json(dbProjectData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// EXPORT MODULE
module.exports = router;