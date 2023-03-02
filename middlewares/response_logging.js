const logger = require('../pkg/logging/winston')

const responseLogging = (req, res, next) => {
    const oldJson = res.json;
    res.json = (body) => {
        res.locals.body = body;

        const query = {...req.query}

        for(let a in query) {
            if (a === 'password') {
                query[a] = 'xxxxxx'
            }
        }

        const logs = {
            type: "response",
            path: req.path,
            query: query,
            headers: req.headers,
            body: req.body,
            params: req.params,
            response: body
        }

        logger.info(JSON.stringify(logs))

        return oldJson.call(res, body);
    };

    next()
}

module.exports = responseLogging