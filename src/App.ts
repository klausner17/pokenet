import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose'
import ListRouter from './routes/ListRouter';
const config = require("./app.json");

class App{

    public express : express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
        this.mongoConnect();
    }

    private middleware() : void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes() : void {
        this.express.use('/api/listraid', ListRouter);
    }

    private mongoConnect(){
        let db = config.connectionMongo.database;
        let server =  config.connectionMongo.server;
        let port = config.connectionMongo.port;
        let conectionString : string = 'mongodb://' + server + ':' + port + '/' + db;
        mongoose.connect(conectionString, (err) => {
            if(err) console.log("Erro ao conectar a instancia. Erro" + err);
            else console.log("Conectado ao banco.");
        });
    }
}

export default new App().express;
