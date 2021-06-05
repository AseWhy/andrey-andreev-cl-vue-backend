import ApiController from "./controllers/ApiController";
import express from "express";
import { get } from 'config';
import { join } from "path";
import mongoose from 'mongoose';

const app = express();

//
void function reconnectionPool(){
    console.log('Try connecting to mongodb host')

    mongoose.connect('mongodb://172.20.0.1:27017/common', get('mongodb') as object).then(console.log).catch(() => setTimeout(reconnectionPool, 1000));
}()

app.disable('x-powered-by'); 

app.use(require('cors')({ origin: "*" }));
app.use('/api', ApiController)
app.use(express.static(join(__dirname, './static/dist')));

app.listen(get('port'))