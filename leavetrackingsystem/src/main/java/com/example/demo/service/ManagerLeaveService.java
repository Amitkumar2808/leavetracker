
package com.example.demo.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Leaves;
import com.example.demo.entities.ManagerLeave;
import com.example.demo.repositry.AdminReprository;
import com.example.demo.repositry.EmployeeRepositry;
import com.example.demo.repositry.LeaveReprositry;
import com.example.demo.repositry.ManagerLeaveRepositry;
import com.example.demo.repositry.ManagerReprository;



@Service
public class ManagerLeaveService {
	
	@Autowired
	EmployeeRepositry erepo;
	
	@Autowired
	ManagerLeaveRepositry mlrepo;
	
	@Autowired
	ManagerReprository mrepo;
	
	@Autowired
	AdminReprository arepo;

	public boolean save(ManagerLeave c) {
		return mlrepo.save(c) != null;
	}

	public List<ManagerLeave> getAll() {
		
		return mlrepo.findAll();
	}

	public List<ManagerLeave> getleavebyempid(int eid) {
	
		return mlrepo.getleavebyempid(eid);
	}

	public ManagerLeave updateLeave(String st, int Leave_id) {
		ManagerLeave p=mlrepo.findById(Leave_id).get();
		p.setStatus(st);
		
	
		
		return mlrepo.save(p);
		
	}

	public List<ManagerLeave> getAllpending() {
		
		return mlrepo.getAllPending();
	}

	

	
	

	
	
	

}


