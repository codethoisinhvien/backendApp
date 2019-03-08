
import { Router } from 'express';
import Hepler from './BaseHelper'
interface Controller {
  path: string;
  router: Router;
  hepl:Hepler
  
}

export default Controller;