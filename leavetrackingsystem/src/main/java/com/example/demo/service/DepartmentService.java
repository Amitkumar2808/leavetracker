package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.entities.Department;
import com.example.demo.repositry.DepartmentRepositry;

@Service
public class DepartmentService {
	@Autowired
	DepartmentRepositry drepo;

	public List<Department> getAll() {
		
		return drepo.findAll();
	}

	public Department findById(int i) {
		
		return drepo.findById(i).get();
	}

}
