import gymRouter from "./routes/gym";
import pokemonGymRouter from "./routes/pokemonGym";
import { User } from "./models/User";
import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Sequelize } from "sequelize-typescript";
import * as fs from "fs";
import indexRoutes from "./routes/index";
import userRoutes from "./routes/user";
import auth from "./middlewares/authentication";
import tokenRouter from "./routes/token";
import trainnerRouter from "./routes/trainner";
import listRaidRouter from "./routes/listRaid";
import googleRouter from "./routes/google";
import * as cors from "cors";
import pokemonRouter from "./routes/pokemon";

class App {
  config = require("./config.json");

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.databaseConnect();
  }

  private middlewares(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(auth.initialize());
  }

  private routes(): void {
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

  private databaseConnect() {
    let dbConf = this.config["database"];
    let sequelize = new Sequelize({
      database: dbConf["database"],
      username: dbConf["user"],
      password: dbConf["password"],
      dialect: dbConf["dialect"],
      port: dbConf["port"],
      modelPaths: [__dirname + "/models"]
    });
  }
}

var app = new App();

export default app;
