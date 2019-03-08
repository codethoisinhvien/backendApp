import Hepler from '../Interface/BaseHelper'
import { async } from 'q';
import { QuestionModel } from './QuestionModel';
import { ChoiceAnsModel } from '../ChoiceAns/ChoiceAnsModel';


class QuestionAnsHepler implements Hepler {
   public status=200;
   public data ;
   heplCreateQuestion= async (data)=>{
   
    let questionModel= new QuestionModel(data);
    let question_ids = [];
    let answer:any
    for(let i=0;i<data.choiceAns.length;i++){
        
        console.log(data.choiceAns[i]);
        let choiceAns = new ChoiceAnsModel(data.choiceAns[i]);
        let result = await choiceAns.save();
        question_ids.push(result._id);
        if(data.choiceAns[i].opt===data.answer){
            answer= result._id;
        }

   }
     
     data.choiceAns= question_ids;
     data.answer=answer;

    try{
    let questionModel= new QuestionModel(data);
    let result = await questionModel.save();

    
    let q = await questionModel.model('Question').findOne({_id:result._id}).populate({path:'answer',populate:{path:'answers'}}).populate({path:'choiceAns'}).exec();
    this.status= 200;
    this.data ={
      success:true,
      result: q

    }
    }catch(e){
        console.log(e);
        this.status= 401;
        this.data={
            err: 'Lỗi không thể thêm câu trả lời '
        }
    }
  }
   delete = async (_id)=>{
      let quenstionModel = new QuestionModel();
      let res = await quenstionModel.model('Question').findOneAndDelete({_id});
      this.status =200;
      this.data={
          success:true,
          data:res
      }
   }
  
 }
 export default QuestionAnsHepler
 /* chức năng 
 giup do
 */