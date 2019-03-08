import Hepler from '../Interface/BaseHelper'
import { async } from 'q';
import { AnswerModel } from './AnswerModel';


class AnswerHepler implements Hepler {
   public status=200;
   public data ;
   heplCreateAnswer= async (data)=>{
    let test ={
        
        answers:['5c85e0498dcfb4272bbaa4d2'],
        explan:"vì "
    }
    let choiceModel= new AnswerModel(test);
    try{
    let result = await choiceModel.save();
    this.status= 200;
    this.data ={
      success:true,
      result: result

    }
    }catch(e){
        this.status= 401;
        this.data={
            err: 'Lỗi không thể  tạo câu hỏi'
        }
    }
  }
  
  
 }
 export default AnswerHepler
 /* chức năng 
 giup do
 */