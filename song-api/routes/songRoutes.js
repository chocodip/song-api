const express = require('express');

// CREATE SONG
router.post('/songs', async (req, res) => {
  try {
    const song = new Song(req.body);
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL SONGS
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE SONG
router.get('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE SONG
router.put('/songs/:id', async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE SONG
router.delete('/songs/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Song deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;