import { async } from "q";
import { userInfo } from 'os';
const fs = require('fs');
const jwt = require('jsonwebtoken');
//const User = require('../database/user');
const key = "phongthiendequan"
class JWT {
  token: string
  data: any
 
  createJWT= async (user) => {
    let val = {
      usename: user.usename,
      password: user.password
      }
    // validate
    this.token = await jwt.sign(val, key)// chua kiem soat phien 
    console.log("Tạo token" + this.token);


  }
  // kiểm tra mã token 
  verifyJWT = (req, res, next) => {
    let auth = req.headers.authorization
    console.log(auth)
    jwt.verify(auth, key, (err, payload) => {


      if (err) {
        return res.status(401).json({ success: false, message: "Xác thực không hợp lệ " })
      }
      this.data = payload;// lay data
      next()



    });


  }





}
export default JWT
