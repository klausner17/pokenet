import { NextFunction } from 'express';
import { User } from './models/User';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import * as express from 'express';
import { Request, Response } from 'express';
import { default_type } from 'mime';
import * as consign from 'consign';
import { Errors } from 'sequelize-typescript/node_modules/@types/sequelize';
import { Router } from 'express-serve-static-core';

class App {

    config  = require("./config.json");

    public express : express.Application;

    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        this.databaseConnect();
    }

    private middlewares() : void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes() : void {
        this.express.route('/')
          .get((req: Request, res: Response) => {
            res.status(200).json({status: "Hello world - Pokenet API"});
          });
        this.express.route('/user')
          .all((req: Request, res: Response, next: NextFunction) => {
            delete req.body.id;
            next();
          })
          .post((req: Request, res: Response) => {
              User.create(req.body)
                .then(result => {
                   res.status(200).json(result); 
                })
                .catch(error => {
                    res.status(402).json({msg: "internal error"});
                });
          });
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
        sequelize.sync();
    }
}

var app = new App();

export default app;
