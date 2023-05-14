package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Department;
import com.example.demo.service.DepartmentService;

@CrossOrigin(origins = "*")
@RestController
public class DepartmentController {
	
	@Autowired
	DepartmentService dser;
	
	@GetMapping("/alldepartment")
	public List<Department> getAll()
	{
		return dser.getAll();
		
	}
	
	@PostMapping("/deptbyid")
	public Department findById(@RequestParam("department_id") int i)
	{
		return dser.findById(i);
	}
	

}
