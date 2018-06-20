import * as fs from 'fs';
import * as winston from 'winston';

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/info.log',
      maxsize: 1048576,
      maxFiles: 3
    }),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
      maxsize: 1048576,
      maxFiles: 10
    })
  ]
});

export { logger };
