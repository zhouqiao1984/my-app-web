/*
Navicat MySQL Data Transfer

Source Server         : mydb
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : mytest

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-11-08 00:04:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for card_detail
-- ----------------------------
DROP TABLE IF EXISTS `card_detail`;
CREATE TABLE `card_detail` (
  `DETAIL_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `DETAIL_NUM` varchar(20) DEFAULT NULL COMMENT '明细编号',
  `DETAIL_DATE` varchar(20) DEFAULT NULL COMMENT '日期',
  `DETAIL_EXPLAIN` varchar(2000) DEFAULT NULL COMMENT '支出具体项目说明',
  `AMOUNT` decimal(12,2) DEFAULT NULL COMMENT '数额',
  `PAY_TYPE` varchar(2) DEFAULT NULL COMMENT '收支类型  00收入  01支出',
  `BALANCE` decimal(12,2) DEFAULT NULL COMMENT '当前余额',
  `PAY_CLASS` varchar(2) DEFAULT NULL COMMENT '收支类别',
  `PAY_EXPLAIN` varchar(2000) DEFAULT NULL COMMENT '类别说明',
  `BILL_NUM` varchar(200) DEFAULT NULL COMMENT '单据编号',
  `REMARK` varchar(2000) DEFAULT NULL COMMENT '备注',
  `CARD_ID` varchar(20) DEFAULT NULL COMMENT '账户ID',
  KEY `detail_index` (`DETAIL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of card_detail
-- ----------------------------
INSERT INTO `card_detail` VALUES ('11', '20171106184918', '2017-11-16', '1111', '11.00', '00', '11.00', '00', '11', '11', '11', '1');
INSERT INTO `card_detail` VALUES ('12', '20171106185056', '2017-11-16', '1', '11.00', '00', '22.00', '03', '1', '1', '1', '1');
INSERT INTO `card_detail` VALUES ('13', '20171106185103', '2017-11-17', '', '12.00', '00', '34.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('14', '20171106185109', '2017-11-16', '', '13.00', '00', '47.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('15', '20171106185115', '2017-11-10', '', '15.00', '00', '62.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('16', '20171106185120', '2017-11-09', '', '16.00', '00', '78.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('17', '20171106185139', '2017-11-09', '', '21.00', '00', '99.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('18', '20171106185157', '2017-11-11', '', '11.00', '01', '88.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('19', '20171106185202', '2017-11-09', '', '12.00', '00', '100.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('20', '20171106185207', '2017-11-09', '', '1.00', '00', '101.00', '00', '', '', '', '1');
INSERT INTO `card_detail` VALUES ('21', '20171106185212', '2017-11-17', '', '1.00', '00', '102.00', '00', '', '', '', '1');

-- ----------------------------
-- Table structure for card_info
-- ----------------------------
DROP TABLE IF EXISTS `card_info`;
CREATE TABLE `card_info` (
  `CARD_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `CARD_NAME` varchar(200) DEFAULT NULL COMMENT '账户名字',
  `CARD_NUM` varchar(20) DEFAULT NULL COMMENT '卡号',
  `CARD_OWNER` varchar(20) DEFAULT NULL COMMENT '持卡人',
  `CARD_BANK` varchar(200) DEFAULT NULL COMMENT '开户行',
  `REMARK` varchar(2000) DEFAULT NULL COMMENT '备注',
  `CARD_STATE` varchar(2) DEFAULT NULL COMMENT '是否启用00启用01停用',
  `CREATE_PERSON` varchar(20) DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_PERSON` varchar(20) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_TIME` varchar(20) DEFAULT NULL COMMENT '修改时间',
  KEY `CARD_INDEX` (`CARD_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of card_info
-- ----------------------------
INSERT INTO `card_info` VALUES ('1', '楚振兴', '00000', '楚振兴', '大连某行', '额鹅鹅鹅', '00', null, null, null, null);
INSERT INTO `card_info` VALUES ('2', '测试账户', '1234', '啊啊', '啊啊', '啊啊', '00', null, null, null, null);
INSERT INTO `card_info` VALUES ('3', '测试账户22', '12322', '22', '22啊', '22', '00', null, null, null, null);
