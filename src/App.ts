import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import * as cors from 'cors';

import auth from './middlewares/authentication';

import gymRouter from './routes/gym';
import pokemonGymRouter from './routes/pokemonGym';
import trainnerRouter from './routes/trainner';
import listRaidRouter from './routes/listRaid';
import userRoutes from './routes/user';
import indexRoutes from './routes/index';
import tokenRouter from './routes/token';
import pokemonRouter from './routes/pokemon';

class App {
  public express: express.Application;

  private config = require('./config');

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.databaseConnect();
  }

  private middlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(auth.initialize());
  }

  private routes(): void {
    this.express.use(indexRoutes);
    this.express.use(userRoutes);
    this.express.use(tokenRouter);
    this.express.use(trainnerRouter);
    this.express.use(listRaidRouter);
    this.express.use(pokemonGymRouter);
    this.express.use(pokemonRouter);
    this.express.use(gymRouter);
  }

  private databaseConnect() {
    const dbConf = this.config.database;
    const sequelize = new Sequelize(dbConf);
    sequelize.addModels([__dirname + '/models']);
    sequelize.sync();
  }
}

const app = new App();

export default app;
