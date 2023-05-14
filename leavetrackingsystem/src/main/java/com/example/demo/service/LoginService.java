package com.example.demo.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Login;
import com.example.demo.repositry.LoginRepositry;

@Service
public class LoginService {

	@Autowired
	LoginRepositry lrepo;
	
	
	public Login add(Login l)
	{
		return lrepo.save(l);
	}
	public Login CheckLogin(String email,String pwd)
	{
		return lrepo.checkLogin(email, pwd);
			
	}

	public Login find(int id)
	{
		return lrepo.findById(id).get();
	}
	public List<Login> getAll() {
		return lrepo.findAll();
	}

}

