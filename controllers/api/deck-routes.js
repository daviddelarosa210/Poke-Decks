
const express = require('express');
const router = express.Router();
const { User, Deck, Card, DeckCard, UserDeck, Message } = require('../../models');

// Create a new deck
router.post('/decks', async (req, res) => {
  try {
    const newDeck = await Deck.create(req.body);
    res.status(201).json(newDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all decks
router.get('/decks', async (req, res) => {
  try {
    const decks = await Deck.findAll();
    res.status(200).json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific deck by ID
router.get('/decks/:deckId', async (req, res) => {
  const deckId = req.params.deckId;
  try {
    const deck = await Deck.findByPk(deckId);
    if (!deck) {
      res.status(404).json({ error: 'Deck not found' });
    } else {
      res.status(200).json(deck);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a deck by ID
router.put('/decks/:deckId', async (req, res) => {
  const deckId = req.params.deckId;
  try {
    const [updatedRows] = await Deck.update(req.body, { where: { id: deckId } });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Deck not found' });
    } else {
      res.status(200).json({ message: 'Deck updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a deck by ID
router.delete('/decks/:deckId', async (req, res) => {
  const deckId = req.params.deckId;
  try {
    const deletedRows = await Deck.destroy({ where: { id: deckId } });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Deck not found' });
    } else {
      res.status(200).json({ message: 'Deck updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
