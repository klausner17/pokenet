import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifyCallback,
  VerifiedCallback
} from 'passport-jwt';
import { User } from '../models/User';
import * as passport from 'passport';
import { Handler } from 'express-serve-static-core';

class Authentication {

  private config: any = require('../config');

  constructor() {
    const optionsLocal: StrategyOptions = {
      secretOrKey: this.config.auth.secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    passport.serializeUser((user: User, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id: number, done) => {
      User.findById(id)
        .then((result) => done(null, result))
        .catch((err) => done(err, null));
    });

    const localStrategy = new Strategy(optionsLocal, this.verify);
    passport.use(localStrategy);
  }

  public verify(payload: User, done: VerifiedCallback): VerifyCallback | void {
    User.findById(payload.id)
      .then((user: User) => {
        if (user) {
          return done(null, { id: user.id, email: user.email });
        }
        return done(null, false);
      })
      .catch((err) => done(err, null));
  }

  public initialize(): Handler {
    return passport.initialize();
  }

  public authenticate(): Handler {
    return passport.authenticate('jwt', { session: this.config.session });
  }
}

const auth: Authentication = new Authentication();
export default auth;
