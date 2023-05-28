const pino = require('pino')

// Log method, path, status, and response time
const log = pino({})

const logger = (req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const responseTime = Date.now() - start
    log.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`
    )
  })
  next()
}

module.exports = logger
