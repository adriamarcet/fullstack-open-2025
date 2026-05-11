const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

router.post('/reset', async (request, response) => {
    const currentDbName = mongoose.connection?.name ?? ''

    if (process.env.NODE_ENV !== 'test' || !currentDbName.toLowerCase().includes('test')) {
        return response.status(403).json({
            error: 'Testing reset is only allowed in test environment and test database'
        })
    }

    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = router