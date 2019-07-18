const Mock = require('mockjs');
const uid = require('node-uid');
const fs = require('fs');
const getdate = ()=>{
    let today = new Date().getTime()
    let s = Math.floor(Math.random()*(20000-10000)*10000)*1000;
    let time = new Date(today-s);
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}
const data = Mock.mock({
    'data|200':[
        {
            'handleState|0-4':1,
            "type|1":['信用贷','押房贷','房乐贷','车乐贷'],
            "serviceName|1":["李大维",'李小冉','李莉','张玲','李家豪'],
            // "id":uid(14),
            'phone':/^1[3579]\d{9}$/,
            // 'date':getdate(),
            'money|1-20':1,
            'interestRate|0-2.1-3':1,
            'customerName':'@cname',
            'order|1-3':1
        }
    ]
});

fs.writeFileSync('./mock/list.json',JSON.stringify(data.data.map(item=>{
    item.id = uid(14);
    item.date = getdate()
    return item;
})))