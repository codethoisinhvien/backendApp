import BaseController from '../Interface/BaseController';
import * as express from 'express';
import UserHepler from './UserHelper';
import { async } from 'q';



export default class UserController implements BaseController {
   public path = '/users';
   public router = express.Router();
   public hepl = new UserHepler()

   constructor() {
      this.intializeRoutes();
   }
   
   intializeRoutes() {
      this.router.route('/login')
      .post(this.login);
      this.router.route(`${this.path}`)
      .post(this.createUser)
      .get( this.getListUser)

      this.router.route(`${this.path}/:id`)
      .get()
      .put()
      .delete(this.delete)
   }
   createUser = async (request: express.Request, response: express.Response) => {
      console.log(request.originalUrl);
      console.log(request.body);
      await this.hepl.create(request.body);
      response.status(this.hepl.status).json(this.hepl.data)

   }
   login = async (request: express.Request, response: express.Response) => {
      console.log(request.originalUrl);
      let data = request.body
      await this.hepl.login(data);
      response.status(this.hepl.status).json(this.hepl.data)
   }
   update = async (request: express.Request, response: express.Response) => {

   }
   delete = async (request: express.Request, response: express.Response) => {
      console.log(request.originalUrl);
      console.log(request.params.id)
      this.hepl.delete(request.params.id);
      response.status(this.hepl.status).json(this.hepl.data)
   }
   getListUser = async (request: express.Request, response: express.Response) => {
      console.log(request.query.page)
       let page = parseInt(request.query.page)||1;
    
      await this.hepl.listUser(page);
      response.status(this.hepl.status).json(this.hepl.data)

   }
   checkJWT(request: express.Request, response: express.Response) {

   }
   createJWT(request: express.Request, response: express.Response) {

   }

}
