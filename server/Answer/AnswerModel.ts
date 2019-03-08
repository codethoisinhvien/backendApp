
import { model, Schema } from 'mongoose';

const AnswerSchema: Schema = new Schema({
    answers:{type: Schema.Types.ObjectId, ref: 'ChoiceAns'},
    explain:String


 
});

export const AnswerModel = model('Answer',AnswerSchema );
