
import { model, Schema } from 'mongoose';

const QuestionSchema: Schema = new Schema({
  
  question:String,
  subject :{type: Schema.Types.ObjectId, ref: 'Subject'},
  choiceAns :[
    {type: Schema.Types.ObjectId, ref: 'ChoiceAns'}
  ],
  answer:{type: Schema.Types.ObjectId, ref: 'ChoiceAns'},
  explain:String
  
  



 
});

export const QuestionModel = model('Question', QuestionSchema );
