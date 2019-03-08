import BaseController  from '../Interface/BaseController';
import * as express from 'express';
import ExamHepler from './ExamHelper';
import { async } from 'q';

export default class ExamController implements BaseController{
   public  path ='/exam';
   public router =express.Router();
   public hepl = new ExamHepler()
    constructor() {
        this.intializeRoutes();
      }
      intializeRoutes(){
        this.router.get(`${this.path}/:id`,this.getExam)
        this.router.post(`${this.path}`,this.create)
      }
      getExam= async(request: express.Request, response: express.Response)=>{
        console.log(request.originalUrl);
        this.hepl.getHeplExam(request.params.id);
        
        response.status(this.hepl.status).json(this.hepl.data)
      }
      create=async (request: express.Request, response: express.Response)=>{
        console.log(request.originalUrl);
        let data={
          time:3600,
          name:'SE-1',
          noQuestion:5,
          questions:[
           '5c865a014e56cc20d48902ff',
           '5c865aaf16342e213b51f24f',
           '5c865addf777ad21751c7073',
           '5c865b267c372421dd49a503',
           '5c864fcba86b0217138d53a5'
          ]
        }
        this.hepl.createHeplExam(data);
        response.status(this.hepl.status).json(this.hepl.data)
      }
      
      checkExam =(request: express.Request, response: express.Response)=>{
        console.log(request.originalUrl);
        response.status(this.hepl.status).json(this.hepl.data)
      }
      update = async (request: express.Request, response: express.Response)=>{

      }
      delete = async (request: express.Request, response: express.Response)=>{
        console.log(request.originalUrl);
        response.status(this.hepl.status).json(this.hepl.data)
      }
}