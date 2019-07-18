var express = require('express');
var router = express.Router();
let checkuser = require('./middleware/checkuser')
let user = require('./controller/user')
let list = require('./controller/list')

//login
router.post('/login', user.login);
//验证是否登陆
router.get('/islogin',checkuser,user.islogin)
//获取验证码
router.get('/checkCode',user.checkCode);
//修改密码
router.post('/resetPassword',checkuser,user.resetPassword)

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/facePhoto')
  },
  filename: function (req, file, cb) {
      const fileName = file.originalname.split('.')
      cb(null,'img-' + Date.now() + '.' +fileName[1])
  }
})
var upload = multer({ storage })
//修改头像
router.post('/facePhoto',upload.single('file'),checkuser,user.setPhoto)
//列表
router.get('/list',checkuser,list.getlist)
//详情
router.get('/detail',checkuser,(req,res,next)=>{

})
module.exports = router;