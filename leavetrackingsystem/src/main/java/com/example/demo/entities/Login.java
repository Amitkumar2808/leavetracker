package com.example.demo.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="login_table")
public class Login {
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Id	
	int login_id;
	@Column(name="email")
	String email;
	@Column(name="role")
	String role;
	@Column(name="password")
	String password;
	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Login(int login_id, String email, String role, String password) {
		super();
		this.login_id = login_id;
		this.email = email;
		this.role = role;
		this.password = password;
	}

	public Login(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public Login(String email,String password,String role) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
		
	}
	public int getLogin_id() {
		return login_id;
	}
	public void setLogin_id(int login_id) {
		this.login_id = login_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Login [login_id=" + login_id + ", email=" + email + ", role=" + role + ", password=" + password + "]";
	}
	
}

