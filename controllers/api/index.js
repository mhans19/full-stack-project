const router = require('express').Router();

const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const contributionRoutes = require('./contribution-routes');

router.use('/users', userRoutes);
router.use('/project', projectRoutes);
router.use('/contribution', contributionRoutes);

module.exports = router;