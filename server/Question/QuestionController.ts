import BaseController from '../Interface/BaseController';
import * as express from 'express';

import { async } from 'q';
import QuestionAnsHepler from './QuestionHelper';


// them cau phuong an chon 
// sua phuoong an chon 
// get data


export default class QuestionController implements BaseController {
    public path = '/question';
    public router = express.Router();
    public hepl = new QuestionAnsHepler()
    constructor() {
        this.intializeRoutes();
    }
    
    intializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getChoiceAns);
        this.router.post(`${this.path}`, this.create);
        this.router.delete(`${this.path}/:id`,this.delete)
        
    }
    getChoiceAns = async (request: express.Request, response: express.Response) => {
        console.log(request.originalUrl);
       

        response.status(this.hepl.status).json(this.hepl.data)
    }
    create = async (request: express.Request, response: express.Response) => {
        console.log(request.originalUrl);
        console.log(request.body);
        let data = {
            question:"Tại sao ?",
            choiceAns:[
               {opt:'A',content:'123',formtype:'String'},

               {opt:'B',content:'456',formtype:'String'},
               {opt:'C',content:'789',formtype:'String'},
               {opt:'D',content:'101',formtype:'String'}
            ],
            answer:'A'
            
        }
        await this.hepl.heplCreateQuestion(data)
        response.status(this.hepl.status).json(this.hepl.data)
    }
    delete = async  (request: express.Request, response: express.Response) => {
        console.log(request.originalUrl);
        this.hepl.delete(request.params.id)
        response.status(this.hepl.status).json(this.hepl.data)
    }
    upadate = async  (request: express.Request, response: express.Response) =>{

    }
    getList= (request: express.Request, response: express.Response) =>{

    }



}