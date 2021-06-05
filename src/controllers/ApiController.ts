import Auth from './helpers/jwt';
import ErrorResponse from "../response/ErrorResponse";
import OrdersController from "./OrdersController";
import { Router } from "express";
import UserController from "./UserController";
import cookieParser from "cookie-parser";
import { json } from "body-parser";

const router = Router();

router.use(
    json(),
    cookieParser()
)

router.use('/user', UserController);
router.use('/orders', [ Auth() ], OrdersController);

router.use(function (err: any, req: any, res: any, next: Function) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json(new ErrorResponse('Unauthorized'));
    }
});

export default router;