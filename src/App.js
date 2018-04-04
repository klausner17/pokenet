import gymRouter from './routes/gym';
import pokemonGymRouter from './routes/pokemonGym';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import indexRoutes from './routes/index';
import userRoutes from './routes/user';
import auth from './middlewares/authentication';
import tokenRouter from './routes/token';
import trainnerRouter from './routes/trainner';
import listRaidRouter from './routes/listRaid';
import googleRouter from './routes/google';
import * as cors from 'cors';
import pokemonRouter from './routes/pokemon';
import * as file from './boot';
class App {
    constructor() {
        this.config = file.default;
        this.express = express();
        this.middlewares();
        this.routes();
        this.databaseConnect();
    }
    middlewares() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(auth.initialize());
    }
    routes() {
        this.express.use(indexRoutes);
        this.express.use(googleRouter);
        this.express.use(userRoutes);
        this.express.use(tokenRouter);
        this.express.use(trainnerRouter);
        this.express.use(listRaidRouter);
        this.express.use(pokemonGymRouter);
        this.express.use(pokemonRouter);
        this.express.use(gymRouter);
    }
    databaseConnect() {
        const dbConf = this.config.database;
        const sequelize = new Sequelize(dbConf.connectionString);
        // let sequelize = new Sequelize({
        //   database: dbConf.database,
        //   username: dbConf.user,
        //   password: dbConf.password,
        //   dialect: dbConf.dialect,
        //   port: dbConf.port,
        //   modelPaths: [__dirname + "/models"]
        // })
        sequelize.addModels([__dirname + '/models']);
        sequelize.sync();
    }
}
const app = new App();
export default app;
