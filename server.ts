


import 'zone.js/dist/zone-node';

// Express Engine
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
const bodyParser = require('body-parser')
const  mongoose = require('mongoose');
import {join} from 'path';

import { from } from 'rxjs';
import {enableProdMode} from '@angular/core';
import {ngExpressEngine} from '@nguniversal/express-engine';

import { Router } from 'express';
import Controller from './server/Interface/BaseController'
import ExamController from './server/Exam/ExamController';
import ChoiceAnsController from './server/ChoiceAns/ChoiceAnsController';
import AnswerController from './server/Answer/AnswerController';
import QuestionController from './server/Question/QuestionController';
import UserController from './server/User/UserController';

enableProdMode();
const PORT = process.env.PORT || 4000;
//sconst DIST_FOLDER = join(process.cwd(), 'dist/browser');
//

const serverDatabase = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'TEST'; // REPLACE WITH YOUR DB NAME

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
//const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

class App {
    public app: express.Application;
  
    constructor(controllers:Controller[]) {
      this.app = express();
      
      this.connectToTheDatabase();
      this.setAngular();
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
      this.initializeErrorHandling();
      
      
    }
  
    public listen() {
      this.app.listen(PORT, (req,res) => {
        console.log(`App listening on the port ${PORT}`);
      });
    }
  
    private initializeMiddlewares() {
      this.app.use(bodyParser.text({ extended:false}));
      this.app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      })
    }
  
    private initializeErrorHandling() {
     
    }
  
    private initializeControllers(controllers: any []) {

      controllers.forEach((controller:any) => {
        this.app.use('/api', controller.router);
        
      });
      /*this.app.get('*.*', express.static(DIST_FOLDER, {
        maxAge: '1y'
      }));*/
      
      // All regular routes use the Universal engine
      this.app.get('*', (req, res) => {
     //  res.render('index', { req });
        console.log(`new GET request at : ${req.originalUrl}`);
      });
    }
    private setAngular(){
     /* this.app.engine('html', ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [
          provideModuleMap(LAZY_MODULE_MAP)
        ]
      }));
      // this.app.set('view engine', 'html');
      //this.app.set('views', DIST_FOLDER);
      */
    }
    private connectToTheDatabase() {
       mongoose.connect('mongodb+srv://admin2:abcd1234@cluster0-iedyi.mongodb.net/test?retryWrites=true').then(() => {
        mongoose.set('useFindAndModify', false);
        console.log('Database connection successful')
        if(false){
         
        }
      })
      .catch(err => {
        console.error('Database connection error')
       
      })
      
    }
  }


const app = new App([
 new ExamController(),
 new ChoiceAnsController(),
 new AnswerController(),
 new QuestionController(),
 new UserController()
]);

app.listen();


//mongodb+srv://admin:<password>@cluster0-iedyi.mongodb.net/test?retryWrites=true