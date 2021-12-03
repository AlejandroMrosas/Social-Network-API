const { Thought, User} = require('../models');

const thoughtController = {
    allThoughts({ params, body }, res) {
        console.log(params);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thought: _id } },
              { new: true }
            );
          })
          .then(dbData => {
            console.log(dbData);
            if (!dbData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbData);
          })
          .catch(err => res.json(err));
      },
}

module.exports = thoughtController;