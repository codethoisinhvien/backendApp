
import { model, Schema } from 'mongoose';
import { Timestamp } from 'bson';
const SubjectSchema: Schema = new Schema({
  name:String,
  exams :[
    {type: Schema.Types.ObjectId, ref: 'Exam'}
  ],
  
 
  



 
});

export const TestModel = model('Subject',SubjectSchema);
