import ErrorResponse from "../response/ErrorResponse";
import OkResponse from "../response/OkResponse";
import Order from "../models/Order";
import { Router } from "express";
import User from "../models/User";

const router = Router();

router.put('/', async (req, res) => {
    await Order.create(
        {
            owner: (req.user as any)._id,
            comment: req.body.comment ?? ''
        }
    )

    res.status(201).json(new OkResponse(true));
});

router.get('/', async (req, res) => {
    res.status(200).json(new OkResponse(await Order.find({ owner: (req.user as any)._id }).limit(req.body.pageCount ?? 20)));
});

router.put('/:id', async (req, res) => {
    const editing = await Order.findById(req.params.id);

    switch(req.body.status) {
        case 'done':
        case 'canceled':
            editing.status = req.body.status;
        break;
        default:
            res.json(new ErrorResponse("Status must have onlue done or canceled values"));
        break;
    }

    res.status(200).json(new OkResponse(true));
});

router.get('/:id', async (req, res) => {
    res.status(200).json(new OkResponse(await Order.find({ _id: req.params.id, owner: (req.user as any)._id })));
});

export default router;