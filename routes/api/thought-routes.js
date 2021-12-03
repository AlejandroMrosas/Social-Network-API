const router = require('express').Router();
const {
    allThoughts,
    throughById,
    createThrough,
    updateThroughById,
    deleteThroughById,
} = require('../../controllers/thought-controller');

router
.route('/')
.get(allThoughts)
.post(createThrough);

router
.route('/:id')
.get(throughById)
.put(updateThroughById)
.delete(deleteThroughById);

module.exports = router;
