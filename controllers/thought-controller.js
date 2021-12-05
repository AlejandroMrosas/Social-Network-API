const { Thought, User} = require('../models');

const thoughtController = {
  allThoughts(req, res) {
    Thought.find({})
    .populate({ 
      path: 'reaction',
      select: '-__v'
    })
      .select('-__v')
      .then(dbThoughtData => {
        res.json(dbThoughtData);
      })
      .catch(err => {
        res.json(err);
      })
  },

  throughById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({ 
      path: 'reaction',
      select: '-__v'
    })
      .select('-__v')
      .then(dbThoughtData => {
        res.json(dbThoughtData);
      })
      .catch(err => {
        res.json(err);
      })
  },

  createThrough({ body }, res) {
    Thought.create(body)
    .then(({ _id }) =>
      User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true })
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });

  },

  updateThroughById({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  deleteThroughById({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.json({ message: 'No note found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      res.json(err);
    });
  }
}

module.exports = thoughtController;