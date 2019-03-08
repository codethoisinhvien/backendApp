import Hepler from '../Interface/BaseHelper'
import { async } from 'q';
import { UserModel } from './UserModel';
import { json } from 'body-parser';
import JWT from '../Auth/JWT';

class UserHepler implements Hepler {
  public status = 200;
  public data;
  public JWT = new JWT();
  create = async (data) => {
   // data.access=1;
   data = JSON.parse(data);
   let result = await UserModel.findOne({username:data.username})
     
    if(result==null){
      try{
      let userModel = new UserModel(data);
      userModel.save();
      this.status=200;
      this.data={
        success:true,
        message:"Đăng kí thành công"

      }
      }catch(e){
        this.status=401;
      this.data={
        success:false,
        message:"Lỗi hệ thống"

      }
      }
    }else{
      this.status=200;
      this.data={
        success:false,
        message:"Tài khoản đã tồn tại"

      }
    }
   



  }
  login = async(message:any)=>{
    console.log(message)
    
    let user=JSON.parse(message)
      
    
    let userModel = new UserModel();
    let res :any = await userModel.model('User').findOne({username:user.username});
    console.log(res)
    console.log(message.username)
    
    if(res!=null){
        if(res.password==user.password){
          await this.JWT.createJWT(res);
          let token = this.JWT.token;
           this.status=200;
           this.data={
             success:true,
             token:token,
             access:res.access
           }
        }else{
          this.status=401;
          this.data={
            success:true,
            message:"Tài khoản hoặc mật khẩu không đúng"
          }
        }
    }else{
      this.status=401;
      this.data={
        success:false,
        message:"Tài khoản hoặc mật khẩu không đúng"
      }
    
    }
  }
  update= async (message)=>{

  }
  listUser = async (page)=>{
    let userModel = new UserModel();
    let res :any = await userModel.model('User').find().skip(page).limit(30).select('access _id email username active firstName lastName');
    this.status=200;
    this.data={
      success:true,
      data:res
    }

    
  }
  delete = async (id)=>{
    let userModel = new UserModel();
    let res = await userModel.model('User').findOneAndDelete({_id:id});
    this.status =200;
    this.data={
      success:true,
      data:res
    }
    
  }
}
export default UserHepler
 /* chức năng
giup do
*/