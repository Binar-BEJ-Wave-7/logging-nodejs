const logger = require('../pkg/logging/winston')

const requestLogging = (req, res, next) => {
    const query = {...req.query}

    for(let a in query) {
        if (a === 'password') {
            query[a] = 'xxxxxx'
        }
    }

    const logs = {
        type: "request",
        path: req.path,
        query: query,
        headers: req.headers,
        body: req.body,
        params: req.params,
    }

    logger.info(JSON.stringify(logs))
    
    next()
}

module.exports = requestLogging