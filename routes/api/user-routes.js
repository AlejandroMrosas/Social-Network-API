const router = require('express').Router();
const {
    allUsers,
    allUsersById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../../controllers/user-controller');

router
.route('/')
.get(allUsers)
.post(createUser);

router
.route('/:id')
.get(allUsersById)
.put(updateUserById)
.delete(deleteUserById);

module.exports = router;