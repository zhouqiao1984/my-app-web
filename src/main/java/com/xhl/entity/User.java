package com.xhl.entity;

import java.io.Serializable;

import org.springframework.stereotype.Component;

@SuppressWarnings("serial")
@Component  //注册bean 为spring容器管理
public class User implements Serializable {

    private int userId;
    private String loginName;    //登陆
    private String passWord;  	//密码
    private String userName; 	//姓名
    private String role;     	//角色
    private String userState;	//是否停用
    private String remark;		//备注
    
    public User(){
    	
    }
    
	public User(String loginName, String passWord, String userName, 
			String role, String userState, String remark) {
		super();
		this.loginName = loginName;
		this.passWord = passWord;
		this.userName = userName;
		this.role = role;
		this.userState = userState;
		this.userState = remark;
	}
	
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public int getUserId() {
		return userId;
	}

	public String getUserState() {
		return userState;
	}

	public void setUserState(String userState) {
		this.userState = userState;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", loginName=" + loginName + ", passWord=" + passWord + ", userName="
				+ userName + ", role=" + role + ", userState=" + userState + ", remark=" + remark + "]";
	}

	
	
	
	
	
	
    
    


}
