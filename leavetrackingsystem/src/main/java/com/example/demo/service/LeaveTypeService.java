package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.LeaveType;
import com.example.demo.repositry.LeaveTypeReprository;

@Service
public class LeaveTypeService {

	@Autowired
	LeaveTypeReprository ltrepo;
	
public List<LeaveType> getAll() {
		
		return ltrepo.findAll();
	}
public LeaveType findById(int lid)
{
	return ltrepo.findById(lid).get();
}
	
}
