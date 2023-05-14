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
@Table(name="manager_table")
public class Manager {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int m_id;
	@Column(name = "first_name")
	String first_name;
	@Column(name = "last_name")
	String last_name;
	@Column(name = "phone")
	String phone;
	@Column(name = "email")
	String email;
	@Column(name = "job_title")
	String job_title;
	
	@Column(name = "location")
	String location;
	
	@Column(name = "join_date")
	Date join_date;
	
	@Column(name = "gender")
	String gender;
	@Column (name = "password")
	String password;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="department_id")
	Department department;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="login")
	Login login;

	public Manager() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Manager(int m_id, String first_name, String last_name, String phone, String email, String job_title,
			String location, Date join_date, String gender, String password, Department department, Login login) {
		super();
		this.m_id = m_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.email = email;
		this.job_title = job_title;
		this.location = location;
		this.join_date = join_date;
		this.gender = gender;
		this.password = password;
		this.department = department;
		this.login = login;
	}

	public Manager(String first_name, String last_name, String phone, String email, String job_title, String location,
			Date join_date, String gender, String password, Department department, Login login) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.email = email;
		this.job_title = job_title;
		this.location = location;
		this.join_date = join_date;
		this.gender = gender;
		this.password = password;
		this.department = department;
		this.login = login;
	}

	public int getM_id() {
		return m_id;
	}

	public void setM_id(int m_id) {
		this.m_id = m_id;
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

	public String getJob_title() {
		return job_title;
	}

	public void setJob_title(String job_title) {
		this.job_title = job_title;
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

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}

}

