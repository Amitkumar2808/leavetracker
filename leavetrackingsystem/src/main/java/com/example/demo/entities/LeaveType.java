package com.example.demo.entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="leavetype_table")
public class LeaveType {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int leavetype_id;
	
	@Column(name="leave_name")
	String leave_type;
	
	

	public LeaveType() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LeaveType(int l_id, String leave_type) {
		super();
		leavetype_id = l_id;
		this.leave_type = leave_type;
	}

	public LeaveType(String leave_type) {
		super();
		this.leave_type = leave_type;
	}

	public int getL_id() {
		return leavetype_id;
	}

	public void setL_id(int l_id) {
		leavetype_id = l_id;
	}

	public String getLeave_type() {
		return leave_type;
	}

	public void setLeave_type(String leave_type) {
		this.leave_type = leave_type;
	}
	
	

}

