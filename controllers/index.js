const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// Much like the API folder's index.js file that collects 
// the endpoints and prefixes them, here we are collecting 
// the packaged group of API endpoints and prefixing them with the path /api.
router.use((req, res) => {
  res.status(404).end();
});
// This is so if we make a request to any endpoint that doesn't exist, 
// we'll receive a 404 error indicating we have requested an incorrect resource, 
// another RESTful API practice.
module.exports = router;