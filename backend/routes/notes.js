// backend/routes/notes.js

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ message: 'Note deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
