package com.example.demo.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.service.LoginService;




@CrossOrigin(origins ="*")
@RestController
public class LoginController {
	@Autowired
	LoginService lser;
	
	@GetMapping("/alllogin")
	public List<Login> getAll()
	{
		return lser.getAll();
		
	}
	@PostMapping("/CheckLogin")
	public Login  checkLogin(@RequestBody Login l)
	{

		return lser.CheckLogin(l.getEmail(),l.getPassword());
	}
}
