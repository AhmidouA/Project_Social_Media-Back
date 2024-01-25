import express from 'express';
import Auth from './Auth.Route';
import User from './User.Route';

const router = express.Router();

export default (): express.Router => {
    Auth(router);
    User(router);

    return router
}