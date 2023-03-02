const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'logging-nodejs' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
      new winston.transports.Console({
        colorize: true,
        prettyPrint: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ],
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
})

module.exports = logger