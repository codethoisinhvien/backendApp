
import { model, Schema } from 'mongoose';

const ChoiceAnsSchema: Schema = new Schema({
    opt: String,
    content: String,
    formtype: String,
    

 
});

export  const ChoiceAnsModel = model('ChoiceAns',ChoiceAnsSchema );
