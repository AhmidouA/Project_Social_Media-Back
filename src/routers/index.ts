import express from 'express';
import Auth from './Auth.Route';

const router = express.Router();

export default (): express.Router => {
    Auth(router);

    return router
}