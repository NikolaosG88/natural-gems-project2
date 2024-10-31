const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user.js');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('gems/index.ejs', {
          gems: currentUser.gems,
        });
      } catch (error) {
        console.log(error)
        res.redirect('/')
      }
  });

router.get('/new', async (req, res) => {
    res.render('gems/new.ejs');
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
    const newGem = {
        name: req.body.name,
        characteristic: req.body.characteristic,
        description: req.body.description,
        pieces: req.body.pieces,
        image: req.file ? req.file.path : ''
      };
        currentUser.gems.push(newGem);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/gems`);
    } catch (error) {

        console.log(error);
        res.redirect('/')
    }
});

router.get('/:gemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const gem = currentUser.gems.id(req.params.gemId);
        res.render('gems/show.ejs', {
          gem: gem,
        });
      } catch (error) {
        console.log(error);
        res.redirect('/')
      }
  });

  router.delete('/:gemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.gems.id(req.params.gemId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/gems`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.get('/:gemId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const gem = currentUser.gems.id(req.params.gemId);
      res.render('gems/edit.ejs', {
        gem: gem,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.put('/:gemId', upload.single('image'), async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const gem = currentUser.gems.id(req.params.gemId);

    gem.name = req.body.name;
    gem.characteristic = req.body.characteristic;
    gem.description = req.body.description;
    gem.pieces = req.body.pieces;

    if (req.file) {
      gem.image = req.file.path;
    }
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/gems/${req.params.gemId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

 //__________________exports_________________// 

module.exports = router;
