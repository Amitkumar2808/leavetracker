package com.example.demo.entities;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;

@Entity
@Table(name="manager_leave_table")
public class ManagerLeave {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int ml_id;
	
	@Column
	int nuleavs;
	@Column
	Date start_date;
	@Column
	Date end_date;
	@Column
	String comment;
	@Column
	String status;
	

	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="manager_id")
	Manager manager;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="leavetype_id")
	LeaveType leavetype;

	

	

	public ManagerLeave(int nuleavs, Date start_date, Date end_date, String comment, String status,
			LeaveType leavetype,Manager manager) {
		super();
		this.nuleavs = nuleavs;
		this.start_date = start_date;
		this.end_date = end_date;
		this.comment = comment;
		this.status = status;
		
		this.leavetype = leavetype;
		this.manager=manager;
	}



	



	public ManagerLeave() {
		super();
		// TODO Auto-generated constructor stub
	}







	public ManagerLeave(int ml_id, int nuleavs, Date start_date, Date end_date, String comment, String status,
			Manager manager, LeaveType leavetype) {
		super();
		this.ml_id = ml_id;
		this.nuleavs = nuleavs;
		this.start_date = start_date;
		this.end_date = end_date;
		this.comment = comment;
		this.status = status;
		this.manager = manager;
		this.leavetype = leavetype;
	}







	public Manager getManager() {
		return manager;
	}



	public void setManager(Manager manager) {
		this.manager = manager;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	

	public int getNuleavs() {
		return nuleavs;
	}

	public void setNuleavs(int nuleavs) {
		this.nuleavs = nuleavs;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	

	public int getMl_id() {
		return ml_id;
	}







	public void setMl_id(int ml_id) {
		this.ml_id = ml_id;
	}







	public LeaveType getLeavetype() {
		return leavetype;
	}

	public void setLeavetype(LeaveType leavetype) {
		this.leavetype = leavetype;
	}

}

