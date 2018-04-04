import * as express from 'express';
import { User } from '../models/User';
import * as jwt from 'jwt-simple';
import * as file from '../boot';
const config = file.default;
const tokenRouter = express.Router();
tokenRouter.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
        const email = req.body.email;
        const pass = req.body.password;
        User.findOne({ where: { email: email } })
            .then((user) => {
            if (user.verifyPassword(pass)) {
                const payload = { id: user.id };
                res
                    .status(200)
                    .json({ token: jwt.encode(payload, config.auth.secretKey) });
            }
            else {
                res.sendStatus(401);
            }
        })
            .catch((error) => res.sendStatus(401));
    }
    else {
        res.sendStatus(401);
    }
});
export default tokenRouter;
