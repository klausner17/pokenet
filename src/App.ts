import { User } from './models/User';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';

class App{

    config  = require("./config.json");

    public express : express.Application;

    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        this.databaseConnect();
    }

    private middlewares() : void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes() : void {

    }

    private databaseConnect(){
        let dbConf = this.config['database'];
        let sequelize = new Sequelize({
            database: dbConf['database'],
            username: dbConf['user'],
            password: dbConf['password'],
            dialect: dbConf['dialect'],
            port: dbConf['port'],
            modelPaths: [__dirname + '/models']
        });
        sequelize.sync()
          .then(() => {
            let user = new User(<User>{
                name: 'klausner',
                email: 'klausner@mail.com',
                password: '12345'
            })
            user.save();
          });
    }
}

var app = new App();

export default app.express;
