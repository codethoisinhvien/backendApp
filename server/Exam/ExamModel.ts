
import { model, Schema } from 'mongoose';
const ExamSchema: Schema = new Schema({
  
  time:Number,
  name:String,
  noQuestion:Number,
  questions :[
    {type: Schema.Types.ObjectId, ref: 'Question'}
  ],
  
  



 
});

export const ExamModel = model('Exam',ExamSchema );
