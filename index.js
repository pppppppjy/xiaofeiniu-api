/**
 * 小肥牛扫码点餐项目API子系统
 */
console.log("准备启动API服务器...");
//转成本地时间
console.log(new Date().toLocaleString());

//引入端口,可随时改变
const PORT = 8090;
//引入express模块
const express = require('express');
//引入跨域模块
const cors = require('cors');
//引入中间件
const bodyParser = require('body-parser');
const categoryRouter = require('./routes/admin/category');
const adminRouter = require('./routes/admin/admin');
const dishRouter = require('./routes/admin/dish');
const settingsRouter = require('./routes/admin/settings');


 //创建HTTP应用服务器
var app = express();
//监听端口
app.listen(PORT,()=>{
    console.log('Server Listening:'+PORT);    
});

//使用中间件
app.use(cors());
// app.use(cors({
//     origin:['http://127.0.0.1:5500','http://localhost:5500'],
//     credentials:true //是否带cookie
// }))


//使用中间件
//把ion/x-www-form-urlencoded格式的请求主体数据解析出来放入req.body属性
// app.use(bodyParser.urlencoded({}));

//把JSON格式的请求主体数据解析出来放入req.body属性
app.use(bodyParser.json());
//挂载路由器
app.use('/admin/category',categoryRouter);
app.use('/admin',adminRouter);
app.use('/admin/dish',dishRouter);
app.use('/admin/settings',settingsRouter);

