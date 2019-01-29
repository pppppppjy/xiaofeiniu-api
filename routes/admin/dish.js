/**
 * 菜品相关路由
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;
/**
 * API: GET /admin/dish
 * 获取所有的菜品(按类别进行分类)
 * 返回数据:
 * [
 *   {cid:1,cname:'肉类',dishList:[{},{},...]}
 *   {cid:2,cname:'菜类',dishList:[{},{},...]}
 * ...
 * ]
 */
router.get('/',(req,res)=>{
    //查询所有的菜品类别
    pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid',(err,result)=>{
        if(err) throw err;
        var categoryList = result;//菜品类别数组
        var finishCount = 0; //已经查询完菜品的类别的数量 
        //var 是直接执行了全部所有的最后的结果 let是执行完一个再执行下一个  
       //for(var c of categoryList){  
        for(let c of categoryList){
            //循环查询每个类别下有哪些菜品,查询该类别下有哪些菜品
            pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC',c.cid,(err,result)=>{
                if(err) throw err;
                c.dishList = result;
                //必须保证所有的类别下的菜品都查询完成才能发送响应消息---这些查询都是异步执行的
                finishCount++;
                if(finishCount == categoryList.length){
                    res.send(categoryList);
                }
            })
        }
    })
})

/**
 * POST /admin/dish/image
 * 请求参数:
 * 接收客户端上传的菜品图片,保存在服务器上,返回该图片在服务器上的随机文件名 
 * 返回数据:
 * {code:200,msg:'upload succ',fileName:'1351324631-8821.jpg'}
 */
//引入multer中间件
const multer = require('multer');
//fs作用是转移文件,从一个转到另外一个文件
const fs = require('fs');
//指定客户端上传的文件临时存储路径
var upload = multer({dest:'tmp/'})
//定义路由,使用文件上传中间件 dishImg必须与文件上传的input里的name一样
router.post('/image',upload.single('dishImg'),(req,res)=>{
    // console.log(req.file); //客户端上传的图片
    // console.log(req.body); //客户端随同图片提交的字符数据
    //客户端上传的文件从临时目录转移到永久的图片路径下
    var tmpFile = req.file.path; //临时文件名
    var suffix = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));//原始文件名中的后缀部分
    var newFile = randFileName(suffix)//目标文件名
    fs.rename(tmpFile,'img/dish/'+newFile,()=>{//rename是重新命名是fs提供的
        res.send({code:200,msg:'upload succ',fileName:newFile})//把临时文件转移
    })
    
})

//生成一个随机文件名
//参数:suffix表示要生成的文件名中的后缀
//形如:1351324631-8821.jpg
function randFileName(suffix){
  var time = new Date().getTime(); //当时系统时间戳
  var num = Math.floor(Math.random()*(10000-1000)+1000);//4位随机数字
  return time + '-'+ num + suffix;
}


 /**
 * POST /admin/dish/
 * 请求参数:{title:'xx',imgUrl:'..jpg',price:xx,detail:'xx',categoryId:xx}
 * 添加一个新的菜品
 * 输出消息:
 * {code:200,msg:'dish added succ',did:46}
 */
router.post('/',(req,res)=>{
    pool.query('INSERT INTO xfn_dish SET ?',req.body,(err,result)=>{
        if(err) throw err;
        //将INSERT语句产生的自增编号输出给客户端
        res.send({code:200,msg:'dish added succ',dishId:result.insertId})
    })
})
 
/**
 * DELETE /admin/dish/:did
 * 根据指定的菜品编号删除该菜品
 * 输出书库:
 * {code:200,msg:'dish deleted succ'}
 * {code:400,msg:'dish not exists'}
 */

 /**
 * PUT /admin/dish
 * 请求参数:{did:xx,title:'xx',imgUrl:'..jpg',price:xx,detail:xx,categoryId:xx}
 * 根据指定的菜品编号修改菜品
 * 输出书库:
 * {code:200,msg:'dish updated succ'}
 * {code:400,msg:'dish not exists'}
 */