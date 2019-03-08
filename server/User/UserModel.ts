
import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    email:String,
    username:String,
    password:String,
    active: {type:Boolean,default:false},
    access:{type:Number,default:1},
    


 
});


export const UserModel = model('User', UserSchema );
