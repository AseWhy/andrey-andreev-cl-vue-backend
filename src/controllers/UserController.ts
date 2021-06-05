import User, { iUser } from './../models/User';

import Auth from './helpers/jwt';
import ErrorResponse from "../response/ErrorResponse";
import OkResponse from "../response/OkResponse";
import { Router } from "express";
import { createHash } from "crypto";
import { get } from 'config';
import jwt from 'jsonwebtoken';

const router = Router();

function newToken(user: iUser){
    return jwt.sign({ ...user, password: undefined }, get('jwt-secret'), { expiresIn: '1800s' })
}

router.put('/create', async (req, res) => {
    if((await User.findOne({ login: req.body.login })) != null) {
        res.json(new ErrorResponse('Duplicate user email'));

        return;
    }

    const new_user = await User.create({
        login: req.body.login,
        password: createHash('sha256').update(req.body.password).digest('hex')
    });

    res.status(201).json(new OkResponse({ token: newToken(new_user.toObject()) }));
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ login: req.body.login, password: createHash('sha256').update(req.body.password).digest('hex') });

    if(user != null) {
        res.status(200).json(new OkResponse({ token: newToken(user.toObject()) }));
    } else {
        res.status(401).json(new ErrorResponse('Unauthorized'));
    }
});

router.post('/current',  [ Auth() ], async (req: any, res: any) => {
    res.json(new OkResponse(req.user));
})

export default router;