/**
 * 桌台相关的理由器
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;
 
 /**
   * GET /admin/table
   * 获取所有的桌台信息
   * 返回数据:
   * [
   *  {tid:xxx,tname:xxx,status:''}
   * ]
   * 
   */
  router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_table ORDER BY tid',(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

 /**
    * GET /admin/table/reservation/:tid
    * 获取预约状态桌台的详情
    */

    /**
     * GET /admin/table/inuse/:tid
     * 获取占用状态桌台的详情
     */

     /**
      * PATCH /admin/table
      * 修改桌台的状态
      */

      /**
       * POST /admin/table
       * 添加桌台
       */

       /**
        * POST /admin/table
        * 删除桌台
        */