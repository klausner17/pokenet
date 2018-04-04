import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/User';
import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import * as file from '../boot';
class Authentication {
    constructor() {
        this.config = file.default;
        const optionsLocal = {
            secretOrKey: this.config.auth.secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        const optionsGoogle = {
            clientID: this.config.googleAuth.clientId,
            clientSecret: this.config.googleAuth.clientSecret,
            callbackURL: this.config.googleAuth.callbackURL
        };
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => {
            User.findById(id)
                .then((result) => done(null, result))
                .catch((err) => done(err, null));
        });
        const localStrategy = new Strategy(optionsLocal, this.verify);
        const googleStrategy = new OAuth2Strategy(optionsGoogle, this.googleVerify);
        passport.use(localStrategy);
        passport.use(googleStrategy);
    }
    verify(payload, done) {
        User.findById(payload.id)
            .then((user) => {
            if (user) {
                return done(null, { id: user.id, email: user.email });
            }
            return done(null, false);
        })
            .catch((err) => done(err, null));
    }
    googleVerify(accesToken, refreshToken, profile, done) {
        process.nextTick(() => {
            User.findOne({ where: { email: profile.emails[0].value } }).then((user) => {
                if (user) {
                    user.googleToken = accesToken;
                    user
                        .save()
                        .then((result) => {
                        return done(null, { id: result.id });
                    })
                        .catch((error) => {
                        return done(error, null);
                    });
                }
                else {
                    User.create({
                        name: profile.name.givenName,
                        email: profile.emails[0].value,
                        googleToken: accesToken
                    })
                        .then((result) => {
                        return done(null, { id: result.id });
                    })
                        .catch((error) => {
                        return done(error, null);
                    });
                }
            });
        });
    }
    initialize() {
        return passport.initialize();
    }
    authenticate() {
        return passport.authenticate('jwt', { session: this.config.session });
    }
}
const auth = new Authentication();
export default auth;
