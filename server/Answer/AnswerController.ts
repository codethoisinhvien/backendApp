import BaseController from '../Interface/BaseController';
import * as express from 'express';

import { async } from 'q';
import AnswerHepler from './AnswerHelper';

//sua dap an 
// sua phuoong an chon 
// get data


export default class AnswerController implements BaseController {
    public path = '/answer';
    public router = express.Router();
    public hepl = new AnswerHepler()
    constructor() {
        this.intializeRoutes();
    }
    
    intializeRoutes() {
      
        this.router.post(`${this.path}/:id`, this.createAnswer)
    }
   
    createAnswer = async (request: express.Request, response: express.Response) => {
        console.log(request.originalUrl);
        await this.hepl.heplCreateAnswer(1)
        response.status(this.hepl.status).json(this.hepl.data)
    }


}