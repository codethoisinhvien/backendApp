import BaseController from '../Interface/BaseController';
import * as express from 'express';
import ChoiceAnsHepler from './ChoiceAnsHepler';
import { async } from 'q';

// them cau phuong an chon 
// sua phuoong an chon 
// get data


export default class ChoiceAnsController implements BaseController {
    public path = '/choiceAns';
    public router = express.Router();
    public hepl = new ChoiceAnsHepler()
    constructor() {
        this.intializeRoutes();
    }
    
    intializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getChoiceAns)
        this.router.post(`${this.path}`, this.createChoice)
    }
    getChoiceAns = async (request: express.Request, response: express.Response) => {
        console.log(request.originalUrl);
        await this.hepl.heplGetChoice(1);

        response.status(this.hepl.status).json(this.hepl.data)
    }
    createChoice = async (request: express.Request, response: express.Response) => {
        console.log(request.originalUrl);
        console.log(request.body);
        let data = request.body
        await this.hepl.heplCreateChoice(data)
        response.status(this.hepl.status).json(this.hepl.data)
    }


}