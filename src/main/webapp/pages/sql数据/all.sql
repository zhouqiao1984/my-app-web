/*
Navicat MySQL Data Transfer

Source Server         : mydb
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : mytest

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-11-02 23:16:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for first_payment
-- ----------------------------
DROP TABLE IF EXISTS `first_payment`;
CREATE TABLE `first_payment` (
  `first_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `first_num` varchar(20) DEFAULT NULL,
  `paydate` varchar(20) DEFAULT NULL COMMENT '付款日期',
  `payment` decimal(12,2) DEFAULT NULL COMMENT '甲方付款金额',
  `balance` decimal(12,2) DEFAULT NULL COMMENT '余额',
  `remark` varchar(2000) DEFAULT NULL COMMENT '备注',
  `project_id` varchar(20) DEFAULT NULL COMMENT '项目ID',
  PRIMARY KEY (`first_id`),
  UNIQUE KEY `first_pk` (`first_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for input_invoice
-- ----------------------------
DROP TABLE IF EXISTS `input_invoice`;
CREATE TABLE `input_invoice` (
  `input_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `input_num` varchar(20) DEFAULT NULL COMMENT '进项发票(普票)编号',
  `paydate` varchar(20) DEFAULT NULL COMMENT '日期',
  `payment` decimal(12,2) DEFAULT NULL COMMENT '金额',
  `paynotax` decimal(12,2) DEFAULT NULL COMMENT '金额(不含税)',
  `taxvalue` decimal(12,2) DEFAULT NULL COMMENT '税额',
  `taxbalance` decimal(12,2) DEFAULT NULL COMMENT '税额余额',
  `remark` varchar(2000) DEFAULT NULL COMMENT '备注',
  `project_id` varchar(20) DEFAULT NULL COMMENT '项目ID',
  KEY `input_pk` (`input_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for input_invoices
-- ----------------------------
DROP TABLE IF EXISTS `input_invoices`;
CREATE TABLE `input_invoices` (
  `input_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `input_num` varchar(20) DEFAULT NULL COMMENT '编号',
  `paydate` varchar(20) DEFAULT NULL COMMENT '日期',
  `payment` decimal(12,2) DEFAULT NULL COMMENT '金额',
  `paynotax` decimal(12,2) DEFAULT NULL COMMENT '金额(不含税)',
  `taxvalue` decimal(12,2) DEFAULT NULL COMMENT '税额',
  `taxbalance` decimal(12,2) DEFAULT NULL COMMENT '税额余额',
  `remark` varchar(2000) DEFAULT NULL COMMENT '备注',
  `project_id` varchar(20) DEFAULT NULL COMMENT '项目ID',
  KEY `input_pk` (`input_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for out_invoice
-- ----------------------------
DROP TABLE IF EXISTS `out_invoice`;
CREATE TABLE `out_invoice` (
  `out_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `out_num` varchar(20) DEFAULT NULL COMMENT '编号',
  `paydate` varchar(20) DEFAULT NULL COMMENT '日期',
  `payment` decimal(12,2) DEFAULT NULL COMMENT '开发票金额',
  `paynotax` decimal(12,2) DEFAULT NULL COMMENT '金额(不含税)',
  `taxvalue` decimal(12,2) DEFAULT NULL COMMENT '税额',
  `balance` decimal(12,2) DEFAULT NULL COMMENT '余额',
  `uptax` decimal(12,2) DEFAULT NULL COMMENT '增值税额',
  `addtax` decimal(12,2) DEFAULT NULL COMMENT '附加税额',
  `othertax` decimal(12,2) DEFAULT NULL COMMENT '其他税额',
  `remark` varchar(2000) DEFAULT NULL COMMENT '备注',
  `project_id` varchar(20) DEFAULT NULL COMMENT '项目ID',
  KEY `out_pk` (`out_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `project_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `project_num` varchar(20) DEFAULT NULL COMMENT '项目编号',
  `project_name` varchar(200) DEFAULT NULL COMMENT '项目名称',
  `project_employer` varchar(200) DEFAULT NULL COMMENT '发包商',
  `project_manager` varchar(20) DEFAULT NULL COMMENT '项目经理',
  `technical_director` varchar(20) DEFAULT NULL COMMENT '技术负责人',
  `start_time` varchar(20) DEFAULT NULL COMMENT '开始时间',
  `finish_time` varchar(20) DEFAULT NULL COMMENT '结束时间',
  `project_price` decimal(12,2) DEFAULT NULL COMMENT '总价(不含税)',
  `project_tax` decimal(12,2) DEFAULT NULL COMMENT '税额',
  `total_prices` decimal(12,2) DEFAULT NULL COMMENT '总价',
  `final_notax` decimal(12,2) DEFAULT NULL COMMENT '决算金额(不含税)',
  `final_tax` decimal(12,2) DEFAULT NULL COMMENT '决算税额',
  `final_total` decimal(12,2) DEFAULT NULL COMMENT '决算金额',
  `project_state` varchar(2) DEFAULT NULL COMMENT '项目状态',
  `remark` varchar(2000) DEFAULT NULL COMMENT '备注',
  KEY `project_pk` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_memo
-- ----------------------------
DROP TABLE IF EXISTS `project_memo`;
CREATE TABLE `project_memo` (
  `memo_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `memo_num` varchar(20) DEFAULT NULL COMMENT '编号',
  `memo_title` varchar(255) DEFAULT NULL COMMENT '摘要',
  `memo_content` varchar(3000) DEFAULT NULL COMMENT '记事内容',
  `create_person` varchar(20) DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `update_person` varchar(20) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(20) DEFAULT NULL COMMENT '修改时间',
  `memo_state` varchar(2) DEFAULT NULL COMMENT '事件状态00 未完成  01 已完成',
  `project_id` varchar(20) DEFAULT NULL COMMENT '项目ID',
  KEY `memo_pk` (`memo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
