import { Request } from "express";
import { get } from 'config';
import jwt from "express-jwt";

export default () => jwt(
    {
        secret: get("jwt-secret"),
        algorithms: [ 'HS256' ]
    }
);