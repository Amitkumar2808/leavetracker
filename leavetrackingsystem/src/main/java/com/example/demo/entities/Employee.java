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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="employee_table")
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int E_id;
	@Column
	String first_name;
	@Column
	String last_name;

	@Column
	String gender;
	@Column
	String phone;
	@Column
	String email;
	@Column 
	String passward;
	@Column
	String job_title;
	
	@Column
	String location;
	
	@Column
	Date join_date;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="manager_id")
	Manager manager;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="department_id")
	Department department;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="login")
	Login login;

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	

	public Employee(String first_name, String last_name, String gender, String phone, String email, String passward,
			String job_title, Department department, String location, Date join_date, Manager manager_id, Login login) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.gender = gender;
		this.phone = phone;
		this.email = email;
		this.passward = passward;
		this.job_title = job_title;
		this.department = department;
		this.location = location;
		this.join_date = join_date;
		this.manager = manager_id;
		this.login = login;
	}




	public Employee(int employee_id, String first_name, String last_name, String gender, String phone, String email,
			String passward, String job_title, Department department, String location, Date join_date, Manager manager_id,
			Login login) {
		super();
		this.E_id = employee_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.gender = gender;
		this.phone = phone;
		this.email = email;
		this.passward = passward;
		this.job_title = job_title;
		this.department = department;
		this.location = location;
		this.join_date = join_date;
		this.manager = manager_id;
		this.login = login;
	}




	public int getEmployee_id() {
		return E_id;
	}

	public void setEmployee_id(int employee_id) {
		this.E_id = employee_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassward() {
		return passward;
	}

	public void setPassward(String passward) {
		this.passward = passward;
	}

	public String getJob_title() {
		return job_title;
	}

	public void setJob_title(String job_title) {
		this.job_title = job_title;
	}

	public Department getDepartment() {
		
		return department;
	}

	public void setDepartment(Department department) {
		
		this.department = department;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getJoin_date() {
		return join_date;
	}

	public void setJoin_date(Date join_date) {
		this.join_date = join_date;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}




	public int getE_id() {
		return E_id;
	}




	public void setE_id(int e_id) {
		E_id = e_id;
	}




	public Manager getManager() {
		return manager;
	}




	public void setManager(Manager manager) {
		this.manager = manager;
	}

	

	

}

