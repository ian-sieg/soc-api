const {User, Thought} = require ('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .populate(['thoughts', 'friends'])
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err))
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((userData) =>
            !userData
                ? res.status(404).json({message: 'No user with that ID'})
                : res.json(userData)
        )
        .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((userData) => 
                !userData
                    ? res.status(404).json({message: 'No user with that ID'})
                    : Thought.deleteMany({_id: {$in: userData.thoughts}})
            )
            .then(() => res.json({message: 'User and associated thoughts deleted!'}))
            .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((userData) =>
            !userData
                ? res.status(404).json({message: 'No user with that ID'})
                : User.findOneAndUpdate(
                    {_id: req.params.friendId},
                    {$addToSet: {friends: req.params.userId}},
                    {runValidators: true, new: true}
                )
        )
        .then(() => res.json({message: `${req.params.userId} and ${req.params.friendId} are now friends!`}))
        .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull : {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((userData) =>
            !userData
                ? res.status(404).json({message: 'No user with that ID'})
                : User.findOneAndUpdate(
                    {_id: req.params.friendId},
                    {$pull : {friends: req.params.userId}},
                    {runValidators: true, new: true}
                )
        )
        .then(() => res.json({message: `${req.params.userId} and ${req.params.friendId} are no longer friends`}))
        .catch((err) => res.status(500).json(err))
    }
}