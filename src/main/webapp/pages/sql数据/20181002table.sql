/*
Navicat MySQL Data Transfer

Source Server         : MYSQL57
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : mytest

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-10-02 09:55:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `card_detail`
-- ----------------------------
DROP TABLE IF EXISTS `card_detail`;
CREATE TABLE `card_detail` (
`DETAIL_ID`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`DETAIL_NUM`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '明细编号' ,
`DETAIL_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`DETAIL_EXPLAIN`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '支出具体项目说明' ,
`AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '数额' ,
`PAY_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收支类型  00收入  01支出' ,
`BALANCE`  decimal(12,2) NULL DEFAULT NULL COMMENT '当前余额' ,
`PAY_CLASS`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收支类别' ,
`PAY_EXPLAIN`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类别说明' ,
`BILL_NUM`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单据编号' ,
`REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`CARD_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账户ID' ,
`REAL_AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '实际发生金额' ,
`DEPOSIT_STATE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '保证金状态  00 未完成  01已完成' ,
UNIQUE INDEX `detail_index` (`DETAIL_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=26

;

-- ----------------------------
-- Table structure for `card_info`
-- ----------------------------
DROP TABLE IF EXISTS `card_info`;
CREATE TABLE `card_info` (
`CARD_ID`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`CARD_NAME`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账户名字' ,
`CARD_NUM`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '卡号' ,
`CARD_OWNER`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '持卡人' ,
`CARD_BANK`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开户行' ,
`REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`CARD_STATE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否启用00启用01停用' ,
`CREATE_PERSON`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`CREATE_TIME`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间' ,
`UPDATE_PERSON`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后修改人' ,
`UPDATE_TIME`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间' ,
UNIQUE INDEX `CARD_INDEX` (`CARD_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=2

;

-- ----------------------------
-- Table structure for `company_record`
-- ----------------------------
DROP TABLE IF EXISTS `company_record`;
CREATE TABLE `company_record` (
`record_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`record_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编号' ,
`record_name`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件摘要' ,
`record_date`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`record_state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态00进行中01已完成' ,
`record_remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '内容' ,
`create_person`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`create_time`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间' ,
`update_person`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编辑人' ,
`update_time`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编辑时间' ,
`relate_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联主键' ,
`relate_type`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '00公司  01项目 02成本 03付款' ,
UNIQUE INDEX `record_pk` (`record_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Table structure for `content_info`
-- ----------------------------
DROP TABLE IF EXISTS `content_info`;
CREATE TABLE `content_info` (
`CONTENT_ID`  int(20) NOT NULL AUTO_INCREMENT ,
`CONTENT_NAME`  varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`CONTENT_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`CONTENT_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`AMOUNT`  decimal(12,2) NULL DEFAULT NULL ,
`REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`DETAIL_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
UNIQUE INDEX `content_pk` (`CONTENT_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=4

;

-- ----------------------------
-- Table structure for `costdetail_info`
-- ----------------------------
DROP TABLE IF EXISTS `costdetail_info`;
CREATE TABLE `costdetail_info` (
`CD_ID`  int(20) NOT NULL AUTO_INCREMENT ,
`CD_PROJECT`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目' ,
`CD_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`CD_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型 00收入 01支出' ,
`AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额' ,
`REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`COST_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本ID' ,
`CD_NAME`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称' ,
`CD_STANDARD`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '规格' ,
`CD_PRICE`  decimal(12,2) NULL DEFAULT NULL COMMENT '单价' ,
`CD_COUNT`  decimal(12,0) NULL DEFAULT NULL COMMENT '数量' ,
`CD_UNIT`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位' ,
UNIQUE INDEX `costdetail_pk` (`CD_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=5

;

-- ----------------------------
-- Table structure for `deposit_manage`
-- ----------------------------
DROP TABLE IF EXISTS `deposit_manage`;
CREATE TABLE `deposit_manage` (
`detail_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账户明细ID(保证金，支出)' ,
`project_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联项目ID' ,
`card_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联汇入账户ID' ,
INDEX `deposit_manage_pk` (`detail_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Table structure for `deposit_return`
-- ----------------------------
DROP TABLE IF EXISTS `deposit_return`;
CREATE TABLE `deposit_return` (
`return_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`return_date`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`return_amount`  decimal(12,2) NULL DEFAULT NULL COMMENT '回款金额' ,
`return_remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`detail_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联账户明细ID' ,
INDEX `deposit_detail_pk` (`return_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for `first_payment`
-- ----------------------------
DROP TABLE IF EXISTS `first_payment`;
CREATE TABLE `first_payment` (
`first_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`first_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`paydate`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '付款日期' ,
`payment`  decimal(12,2) NULL DEFAULT NULL COMMENT '甲方付款金额' ,
`balance`  decimal(12,2) NULL DEFAULT NULL COMMENT '余额' ,
`remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`project_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
PRIMARY KEY (`first_id`),
UNIQUE INDEX `first_pk` (`first_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=2

;

-- ----------------------------
-- Table structure for `input_invoice`
-- ----------------------------
DROP TABLE IF EXISTS `input_invoice`;
CREATE TABLE `input_invoice` (
`input_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`input_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '进项发票(普票)编号' ,
`paydate`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`payment`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额' ,
`paynotax`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额(不含税)' ,
`taxvalue`  decimal(12,2) NULL DEFAULT NULL COMMENT '税额' ,
`underfilled`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '缺少材料' ,
`remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`project_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
`type`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型' ,
`state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态' ,
`company`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开票单位' ,
`invoice_type`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发票类型00普通  01专用' ,
UNIQUE INDEX `input_pk` (`input_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=6

;

-- ----------------------------
-- Table structure for `invoice_pay`
-- ----------------------------
DROP TABLE IF EXISTS `invoice_pay`;
CREATE TABLE `invoice_pay` (
`IP_ID`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`IP_NUM`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编号' ,
`IP_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`IP_AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额' ,
`IP_REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`INPUT_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发票ID' ,
`PROJECT_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
`IP_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发票类型，00进项 01出项' ,
UNIQUE INDEX `i_pay_pk` (`IP_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='发票付款\r\n'
AUTO_INCREMENT=7

;

-- ----------------------------
-- Table structure for `other_detail`
-- ----------------------------
DROP TABLE IF EXISTS `other_detail`;
CREATE TABLE `other_detail` (
`OTHER_DETAIL_ID`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`OTHER_DETAIL_NUM`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '明细编号' ,
`OTHER_DETAIL_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`OTHER_AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '数额' ,
`OTHER_PAY_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收支类型  00收入  01支出' ,
`REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`OTHER_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '其他款项ID' ,
`REAL_AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '实际发生金额' ,
UNIQUE INDEX `other_detail_pk` (`OTHER_DETAIL_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for `other_info`
-- ----------------------------
DROP TABLE IF EXISTS `other_info`;
CREATE TABLE `other_info` (
`OTHER_ID`  int(20) NOT NULL AUTO_INCREMENT COMMENT '其他款项ID' ,
`OTHER_NAME`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '其他款项名称' ,
`REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`OTHER_STATE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否启用 00启用 01停用' ,
`CREATE_PERSON`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`CREATE_TIME`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间' ,
`UPDATE_PERSON`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人' ,
`UPDATE_TIME`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间' ,
`OTHER_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型 00应收 01应付 02流水' ,
UNIQUE INDEX `other_info_pk` (`OTHER_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=4

;

-- ----------------------------
-- Table structure for `out_invoice`
-- ----------------------------
DROP TABLE IF EXISTS `out_invoice`;
CREATE TABLE `out_invoice` (
`out_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`out_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编号' ,
`paydate`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`payment`  decimal(12,2) NULL DEFAULT NULL COMMENT '开发票金额' ,
`paynotax`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额(不含税)' ,
`taxvalue`  decimal(12,2) NULL DEFAULT NULL COMMENT '税额' ,
`underfilled`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '缺少材料' ,
`uptax`  decimal(12,2) NULL DEFAULT NULL COMMENT '增值税额' ,
`addtax`  decimal(12,2) NULL DEFAULT NULL COMMENT '附加税额' ,
`othertax`  decimal(12,2) NULL DEFAULT NULL COMMENT '其他税额' ,
`remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`project_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
`company`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态  00已开 01未开 02完成' ,
`type`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型 00个人垫付  01欠客户   02 公司付款 03 完成 ' ,
`invoice_type`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发票类型 00普通  01专用' ,
UNIQUE INDEX `out_pk` (`out_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=5

;

-- ----------------------------
-- Table structure for `project_cost`
-- ----------------------------
DROP TABLE IF EXISTS `project_cost`;
CREATE TABLE `project_cost` (
`COST_ID`  int(11) NOT NULL AUTO_INCREMENT ,
`COST_NUM`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编号' ,
`COST_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`COST_DETAIL`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本明细' ,
`COST_AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额' ,
`COST_TYPE`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型' ,
`COST_REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`PROJECT_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
`COST_TYPE2`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收支类型 00收入 01支出' ,
UNIQUE INDEX `p_cost_pk` (`COST_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=6

;

-- ----------------------------
-- Table structure for `project_info`
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
`project_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '项目ID' ,
`project_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目编号' ,
`project_name`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目名称' ,
`project_employer`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发包商' ,
`project_manager`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目经理' ,
`technical_director`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '技术负责人' ,
`start_time`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开始时间' ,
`finish_time`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结束时间' ,
`project_price`  decimal(12,2) NULL DEFAULT NULL COMMENT '总价(不含税)' ,
`project_tax`  decimal(12,2) NULL DEFAULT NULL COMMENT '税额' ,
`total_prices`  decimal(12,2) NULL DEFAULT NULL COMMENT '总价' ,
`final_notax`  decimal(12,2) NULL DEFAULT NULL COMMENT '决算金额(不含税)' ,
`final_tax`  decimal(12,2) NULL DEFAULT NULL COMMENT '决算税额' ,
`final_total`  decimal(12,2) NULL DEFAULT NULL COMMENT '决算金额' ,
`project_state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目状态' ,
`remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`cost_state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本管理状态00未完成01已完成' ,
`pay_state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '付款管理状态00未完成01已完成' ,
`project_type`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目类型 00自营 01挂靠 02陪标' ,
UNIQUE INDEX `project_pk` (`project_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=7

;

-- ----------------------------
-- Table structure for `project_memo`
-- ----------------------------
DROP TABLE IF EXISTS `project_memo`;
CREATE TABLE `project_memo` (
`memo_id`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`memo_num`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编号' ,
`memo_date`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`memo_title`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '摘要' ,
`memo_content`  varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '记事内容' ,
`create_person`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`create_time`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间' ,
`update_person`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人' ,
`update_time`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间' ,
`memo_state`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件状态00 未完成  01 已完成' ,
`project_id`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
UNIQUE INDEX `memo_pk` (`memo_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=4

;

-- ----------------------------
-- Table structure for `project_pay`
-- ----------------------------
DROP TABLE IF EXISTS `project_pay`;
CREATE TABLE `project_pay` (
`PAY_ID`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`PAY_NUM`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编号' ,
`PAY_DATE`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日期' ,
`PAY_AMOUNT`  decimal(12,2) NULL DEFAULT NULL COMMENT '金额' ,
`PAY_REMARK`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`PROJECT_ID`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目ID' ,
UNIQUE INDEX `p_pay_pk` (`PAY_ID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='项目付款\r\n'
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for `test_user`
-- ----------------------------
DROP TABLE IF EXISTS `test_user`;
CREATE TABLE `test_user` (
`userid`  int(20) NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`loginname`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名' ,
`password`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码' ,
`username`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名' ,
`role`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '系统权限' ,
`userstate`  varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否停用00启用01停用' ,
`remark`  varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
UNIQUE INDEX `user_pk` (`userid`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=4

;

-- ----------------------------
-- Auto increment value for `card_detail`
-- ----------------------------
ALTER TABLE `card_detail` AUTO_INCREMENT=26;

-- ----------------------------
-- Auto increment value for `card_info`
-- ----------------------------
ALTER TABLE `card_info` AUTO_INCREMENT=2;

-- ----------------------------
-- Auto increment value for `company_record`
-- ----------------------------
ALTER TABLE `company_record` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `content_info`
-- ----------------------------
ALTER TABLE `content_info` AUTO_INCREMENT=4;

-- ----------------------------
-- Auto increment value for `costdetail_info`
-- ----------------------------
ALTER TABLE `costdetail_info` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for `deposit_return`
-- ----------------------------
ALTER TABLE `deposit_return` AUTO_INCREMENT=1;

-- ----------------------------
-- Auto increment value for `first_payment`
-- ----------------------------
ALTER TABLE `first_payment` AUTO_INCREMENT=2;

-- ----------------------------
-- Auto increment value for `input_invoice`
-- ----------------------------
ALTER TABLE `input_invoice` AUTO_INCREMENT=6;

-- ----------------------------
-- Auto increment value for `invoice_pay`
-- ----------------------------
ALTER TABLE `invoice_pay` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `other_detail`
-- ----------------------------
ALTER TABLE `other_detail` AUTO_INCREMENT=1;

-- ----------------------------
-- Auto increment value for `other_info`
-- ----------------------------
ALTER TABLE `other_info` AUTO_INCREMENT=4;

-- ----------------------------
-- Auto increment value for `out_invoice`
-- ----------------------------
ALTER TABLE `out_invoice` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for `project_cost`
-- ----------------------------
ALTER TABLE `project_cost` AUTO_INCREMENT=6;

-- ----------------------------
-- Auto increment value for `project_info`
-- ----------------------------
ALTER TABLE `project_info` AUTO_INCREMENT=7;

-- ----------------------------
-- Auto increment value for `project_memo`
-- ----------------------------
ALTER TABLE `project_memo` AUTO_INCREMENT=4;

-- ----------------------------
-- Auto increment value for `project_pay`
-- ----------------------------
ALTER TABLE `project_pay` AUTO_INCREMENT=1;

-- ----------------------------
-- Auto increment value for `test_user`
-- ----------------------------
ALTER TABLE `test_user` AUTO_INCREMENT=4;
