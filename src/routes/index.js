import * as express from 'express';
const indexRoutes = express.Router();
indexRoutes.route('/').get((req, res) => {
    res.status(200).json({ status: 'Hello world - Pokenet API' });
});
export default indexRoutes;
