import * as http from 'http';
import * as debug from 'debug';
import * as boot from './boot';
import app from './App';
const config = boot.default;
const port = normalizePort(config.port);
app.express.set('port', port);
const server = http.createServer(app.express);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    const portIn = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(portIn)) {
        return val;
    }
    else if (portIn >= 0) {
        return portIn;
    }
    else {
        return false;
    }
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
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
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ${addr}' : 'port ${addr.port}';
    debug('Listening on ${bind}');
}
