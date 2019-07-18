const jwt = require('jsonwebtoken');
const uid = require('node-uid');
let {
	getdata,
	setdata
} = require('../../../utils/setfile')
let checkCodetext = '';
const login = (req, res, next) => {
	let {
		phone,
		password,
		checkcode
	} = req.body;
	if (!phone || !password || !checkcode) {
		res.send({
			code: 1,
			message: "参数不正确"
		});
		return;
	}
	let users = getdata('user.json');
	let isuser = users.find(item => item.phone === phone && item.password === password);
	if (isuser) {
		if (checkcode === checkCodetext) {
			const sessionId = jwt.sign({
				...isuser,
				exp: (+new Date() ) + 1000,
			}, 'yihang888')
			res.send({
				sessionId,
				code: 0,
				message: "success"
			})
		} else {
			res.send({
				code: 1,
				message: '验证码输入有误请重新输入！'
			})
		}
	} else {
		res.send({
			code: 1,
			message: '用户名密码有误！'
		})
	}
}
const checkCode = (req, res) => {
	checkCodetext = uid(4);
	res.send({
		code: 0,
		Verification: checkCodetext
	})
}

const resetPassword = (req,res,next)=>{
	let {id} = req.info;  //当前登陆的用户
	let {newPassword} = req.body;
	let users = getdata('user.json');
	let curuser = users.find(item=>item.id==id);
	curuser.password = newPassword;
	setdata('user.json',users);
	res.send({
		code:0,
		message:'修改成功'
	})
}
const setPhoto = (req,res,next)=>{
	let {id} = req.info;
	let users = getdata('user.json');
	let curuser = users.find(item=>item.id==id);
	let imgurl = `/facePhoto/${req.file.filename}`;
	curuser.facePhoto = imgurl;
	const sessionId = jwt.sign({
		...curuser,
		exp: (+new Date() ) + 1000,
	}, 'yihang888')
	setdata('user.json',users);
	res.json({
		code: 0,
		message:'修改成功',
		obj: curuser,
		sessionId
	})
}

const islogin = (req,res,next)=>{
	res.send({
		code:0,
		info:req.info
	})
}
module.exports = {
    login,
	checkCode,
	resetPassword,
	setPhoto,
	islogin
}