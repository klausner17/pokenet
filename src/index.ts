import * as http from 'http';
import * as dotenv from 'dotenv';
// tslint:disable-next-line:no-var-requires
const config = require('./config');
dotenv.config();
import app from './App';

const port = normalizePort(config.port);
app.express.set('port', port);

const server = http.createServer(app.express);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  const portIn: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(portIn)) { return val; } else if (portIn >= 0) { return portIn; } else { return false; }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  // tslint:disable-next-line:no-console
  console.log(`Listening on ${bind}`);
}
