package com.xhl.entity;

import java.io.Serializable;

public class Project implements Serializable{
	
	private int projectId;
	private String projectNum;
	private String projectName;
	private String projectEmployer;
	private String projectManager;
	private String technicalDirector;
	private String startTime;
	private String finishTime;
	private String projectPrice;
	private String projectTax;
	private String totalPrices;
	private String projectState;
	private String remark;
	public String getProjectNum() {
		return projectNum;
	}
	public void setProjectNum(String projectNum) {
		this.projectNum = projectNum;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectEmployer() {
		return projectEmployer;
	}
	public void setProjectEmployer(String projectEmployer) {
		this.projectEmployer = projectEmployer;
	}
	public String getProjectManager() {
		return projectManager;
	}
	public void setProjectManager(String projectManager) {
		this.projectManager = projectManager;
	}
	public String getTechnicalDirector() {
		return technicalDirector;
	}
	public void setTechnicalDirector(String technicalDirector) {
		this.technicalDirector = technicalDirector;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getFinishTime() {
		return finishTime;
	}
	public void setFinishTime(String finishTime) {
		this.finishTime = finishTime;
	}
	public String getProjectPrice() {
		return projectPrice;
	}
	public void setProjectPrice(String projectPrice) {
		this.projectPrice = projectPrice;
	}
	public String getProjectTax() {
		return projectTax;
	}
	public void setProjectTax(String projectTax) {
		this.projectTax = projectTax;
	}
	public String getTotalPrices() {
		return totalPrices;
	}
	public void setTotalPrices(String totalPrices) {
		this.totalPrices = totalPrices;
	}
	public String getProjectState() {
		return projectState;
	}
	public void setProjectState(String projectState) {
		this.projectState = projectState;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getProjectId() {
		return projectId;
	}
	public Project(String projectNum, String projectName, String projectEmployer, String projectManager,
			String technicalDirector, String startTime, String finishTime, String projectPrice, String projectTax,
			String totalPrices, String projectState, String remark) {
		super();
		this.projectNum = projectNum;
		this.projectName = projectName;
		this.projectEmployer = projectEmployer;
		this.projectManager = projectManager;
		this.technicalDirector = technicalDirector;
		this.startTime = startTime;
		this.finishTime = finishTime;
		this.projectPrice = projectPrice;
		this.projectTax = projectTax;
		this.totalPrices = totalPrices;
		this.projectState = projectState;
		this.remark = remark;
	}
	@Override
	public String toString() {
		return "Project [projectId=" + projectId + ", projectNum=" + projectNum + ", projectName=" + projectName
				+ ", projectEmployer=" + projectEmployer + ", projectManager=" + projectManager + ", technicalDirector="
				+ technicalDirector + ", startTime=" + startTime + ", finishTime=" + finishTime + ", projectPrice="
				+ projectPrice + ", projectTax=" + projectTax + ", totalPrices=" + totalPrices + ", projectState="
				+ projectState + ", remark=" + remark + "]";
	}
	
	
	
	
	
	
	
}
