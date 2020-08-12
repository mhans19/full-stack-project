const router = require('express').Router();
const { Contribution } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Contribution.findAll({
        attributes: ['id', 
                    'contribution_type', 
                    'contribution_hours',
                    'project_id', 
                    'user_id'
                    ]
        })
        .then(dbContributionData => res.json(dbContributionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// CREATE CONTRIBUTION
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Contribution.create({
                contribution_type: req.body.contribution_type,
                contribution_hours: req.body.contribution_hours,
                project_id: req.body.project_id,
                // use the id from the session
                user_id: req.session.user_id
            })
            .then(dbContributionData => res.json(dbContributionData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Contribution.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbContributionData => {
            if (!dbContributionData) {
                res.status(404).json({
                    message: 'No contribution found with this id'
                });
                return;
            }
            res.json(dbContributionData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// EXPORT MODULES
module.exports = router;