const {User, Thought} = require ('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {username: req.body.username},
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
                )
            })
            .then((user) => 
                !user
                    ? res.status(404).json({message: `Thought created but no user with the username ${user.username} exists`})
                    : res.json('Posted the thought!')
            )
            .catch((err) => res.status(500).json(err))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({message: `No thought with that ID: ${thoughtData._id}`})
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err))
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thoughtData) => 
                !thoughtData
                    ? res.status(404).json({message: `No thought with that ID: ${thoughtData._id}`})
                    : User.findOneAndUpdate(
                        {username: thoughtData.username},
                        {$pull: {thoughts: req.params.thoughtId}},
                        {runValidators: true, new: true}
                    )
            )
            .then(() => res.json({message: 'Thought deleted!'}))
            .catch((err) => res.status(500).json(err))
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thoughtData) => 
            !thoughtData
                ? res.status(404).json({message: `No thought with that ID: ${thoughtData._id}`})
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err))
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: req.params.reactionId}},
            {runValidators: true, new: true}
        )
        .then((thoughtData) => 
            !thoughtData
                ? res.status(404).json({message: `No thought with that ID: ${thoughtData._id}`})
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err))
    }
}