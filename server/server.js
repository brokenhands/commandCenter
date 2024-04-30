const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/commandCenterDatabase', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the database!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const Game = require('./models/Game');

// Create a new game
app.post('/games', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).send(newGame);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all games
app.get('/games', async (req, res) => {
  try {
    const games = await Game.find({});
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get specific game
app.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Additional routes for updating and deleting games can be added here

const Participation = require('./models/Participation');

// Add a participant to a game
app.post('/participations', async (req, res) => {
  try {
    const participation = new Participation(req.body);
    await participation.save();
    res.status(201).send(participation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all participations for a game
app.get('/participations', async (req, res) => {
  try {
    const participations = await Participation.find({});
    res.send(participations);
  } catch (error) {
    res.status(500).send(error);
  }
});

console.log('******************************')
console.log('commandCenter is ready')
console.log('******************************')
console.log('Current available APIs:')
console.log(app._router.stack.map(r => {
  if (r.route) {
      return Object.getOwnPropertyNames(r.route.methods)[0].toUpperCase() + ' ' + r.route.path          
  }
  return null; // Filter out middleware or other non-route entries
}).filter(item => item !== null));
