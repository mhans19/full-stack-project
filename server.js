// DEPENDENCIES
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// PORT
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// HANDLEBARS
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

// SET UP SESSION
const sess = {
  secret: process.env.SESSION_SECRET || "secret",
  cookie: {
    maxAge: 30 * 60000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// ROUTES
app.use(routes);

// CONNECTION
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => 
  console.log(`API server now on port ${PORT}!`));
});