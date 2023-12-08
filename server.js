
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const pokemon = require('pokemontcgsdk');
const homeRoutes = require('./controllers/home-routes');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const apiKey = process.env.TCG_API_KEY;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};


app.get('/api/cards', async (req, res) => {
  try {
    const cards = await pokemon.card.where({ pageSize: 10 });
    res.json(cards);
  } catch (error) {
    console.error('Error fetching Pokémon cards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});