const connection = require('../config/connection')
const {User, Thought} = require('../models')

console.time('seeding')

connection.once('open', async () => {
    await User.deleteMany({})
    await Thought.deleteMany({})

    const users = []
    const thoughts = []

    const makeUser = (data) => {
        users.push({
            
        })
    }
})