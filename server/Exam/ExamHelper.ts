import Hepler from '../Interface/BaseHelper'
import { async } from 'q';
import { ExamModel } from './ExamModel';

class ExamHepler implements Hepler {
   public status=200;
   public data ;
  createHeplExam= async (data)=>{
   let examModel = new ExamModel(data);
    let result = await examModel.save();
   this.status=200;
   this.data ={
     success:true,
     data:result

     
   }
  }
  getHeplExam= async (id)=>{
   name:'SE-1'
     let examModel = new ExamModel() ;
     let res = await examModel.model('Exam').findOne({name:'SE-1'})
     .populate({path:'questions',select:'-answer -__v',populate:{path:'choiceAns'}}).exec()
     this.status=200;
     this.data ={
       success:true,
       data:res
     }
  }
  addQuestion= async (data)=>{
     
   
  }
  addChoice= async (data)=>{

  }
  addAnsewer= async (data)=>{

  }
 }
 export default ExamHepler
 /* chức năng 
 giup do
 */