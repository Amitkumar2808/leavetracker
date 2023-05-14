package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="department_table")
public class Department {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int department_id;
	
	@Column
	String department_name;

	public Department() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Department(int department_id, String department_name) {
		super();
		this.department_id = department_id;
		this.department_name = department_name;
	}

	public Department(String department_name) {
		super();
		this.department_name = department_name;
	}

	public int getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}

	public String getDepartment_name() {
		return department_name;
	}

	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	

}
