package com.example.demo.vo;

import java.util.Date;

public class SaveLeaveVo {
	   public int employee_id;
	    public Date start_date;
	    public Date end_date;
	    public int nuleaves;
	    public int leavetype_id;
	    public String comment;
	    public String status;
	    public int manager_id;
		public SaveLeaveVo() {
			super();
			// TODO Auto-generated constructor stub
		}
		public SaveLeaveVo(int employee_id, Date start_date, Date end_date, int nuleaves, int leavetype_id,
				String comment, String status, int manager_id) {
			super();
			this.employee_id = employee_id;
			this.start_date = start_date;
			this.end_date = end_date;
			this.nuleaves = nuleaves;
			this.leavetype_id = leavetype_id;
			this.comment = comment;
			this.status = status;
			this.manager_id=manager_id;
		}
		
		public int getManager_id() {
			return manager_id;
		}
		public void setManager_id(int manager_id) {
			this.manager_id = manager_id;
		}
		public int getEmployee_id() {
			return employee_id;
		}
		public void setEmployee_id(int employee_id) {
			this.employee_id = employee_id;
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
		public int getNuleaves() {
			return nuleaves;
		}
		public void setNuleaves(int nuleaves) {
			this.nuleaves = nuleaves;
		}
		public int getLeavetype_id() {
			return leavetype_id;
		}
		public void setLeavetype_id(int leavetype_id) {
			this.leavetype_id = leavetype_id;
		}
		public String getComment() {
			return comment;
		}
		public void setComment(String comment) {
			this.comment = comment;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
	    

}
