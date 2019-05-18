const {
  createLogger,
  format,
  transports
} = require('winston');

const LOG_DIR = './logs/';

function getLoggingLevel() {
  if (process.env.NODE_ENV === 'production') {
    return 'info';
  }
  return 'debug';
}

const logDate = new Date()
  .toISOString()
  .replace(/\:/g, '_')
  .replace(/\./g, '_');

const logger = createLogger({
  level: getLoggingLevel(),
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'discord-snake' },
  transports: [
    new transports.File({
      dirname: LOG_DIR,
      filename: `${logDate}-error.log`,
      level: 'error'
    }),
    new transports.File({
      dirname: LOG_DIR,
      filename: `${logDate}-combined.log`,
      level: 'info'
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

module.exports = logger;
