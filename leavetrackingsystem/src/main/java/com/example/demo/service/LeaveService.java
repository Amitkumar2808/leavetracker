package com.example.demo.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Leaves;
import com.example.demo.repositry.AdminReprository;
import com.example.demo.repositry.EmployeeRepositry;
import com.example.demo.repositry.LeaveReprositry;
import com.example.demo.repositry.ManagerReprository;



@Service
public class LeaveService {
	
	@Autowired
	EmployeeRepositry erepo;
	
	@Autowired
	LeaveReprositry lrepo;
	
	@Autowired
	ManagerReprository mrepo;
	
	@Autowired
	AdminReprository arepo;

	public boolean save(Leaves c) {
		return lrepo.save(c) != null;
	}

	public List<Leaves> getAll() {
		
		return lrepo.findAll();
	}

	public List<Leaves> getleavebyempid(int eid) {
	
		return lrepo.getleavebyempid(eid);
	}

	public Leaves updateLeave(String st, int Leave_id) {
		Leaves p=lrepo.findById(Leave_id).get();
		p.setStatus(st);
		
	
		
		return lrepo.save(p);
		
	}

	public List<Leaves> getAllpending() {
		
		return lrepo.getAllPending();
	}

	

	public List<Leaves> getAllpendingbydept(int id) {
		
		return lrepo.getAllpendingbydept(id);
	}

	
	
	

}

