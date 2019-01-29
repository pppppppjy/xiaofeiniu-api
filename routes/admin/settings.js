/**
 * 全局设置
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;
/**
 * GET /admin/settings
 * 获取全部全局设置
 * API:
 */

 /**
  * PUT /admin/settings
  * 修改全局设置
  */

  /**
   * GET /admin/table
   * 获取所有的桌台信息
   */

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