import Hepler from '../Interface/BaseHelper'
import { async } from 'q';
import { ChoiceAnsModel } from './ChoiceAnsModel';

class ChoiceAnsHepler implements Hepler {
   public status=200;
   public data ;
   heplCreateChoice= async (data)=>{
    data = JSON.parse(data)
    let choiceModel= new ChoiceAnsModel(data);
    
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
            err: 'Lỗi không thể thêm câu trả lời '
        }
    }
  }
   heplGetChoice = async (id)=>{
    let choiceModel= new ChoiceAnsModel();
    let result = await choiceModel.model('ChoiceAns')
    .find().skip(id).limit(30);
    this.data ={
        success:true,
        result: result
  
      }
   }
  
 }
 export default ChoiceAnsHepler
 /* chức năng 
 giup do
 */