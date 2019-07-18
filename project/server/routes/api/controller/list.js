let data = require('../../../mock/list')
const getlist = (req,res)=>{
	let {order,page,pageSize} = req.query;
	if(!order){
		res.send({
			code:1,
			message:'参数不完整'
		})
		return;
	}
	let orderList = data.filter(item=>item.order==order);
	// let maxPage = Math.ceil(orderList.length / pageSize);
	// let startIndex = (page*1-1)*pageSize*1;
	// let endindex = startIndex+pageSize*1;
	res.send({
		code:0,
		data:orderList
	})
}

module.exports = {
    getlist
}