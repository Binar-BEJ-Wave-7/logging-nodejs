const express = require('express')
const requestLogging = require('./middlewares/request_logging')
const responseLogging = require('./middlewares/response_logging')

const app = express()

app.use(express.json())

app.use(requestLogging)
app.use(responseLogging)

app.get('/v1/users', (req, res, next) => {
    try {
        console.log('=========', req.query)
        const user = {
            user_id: 1,
            user_name: 'Saefulloh'
        }

        return res.status(200).json({
            message: 'success',
            data: user
        })
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    })
})

app.listen(8015, () => {
    console.log('server running on port 8015')
})