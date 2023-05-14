package com.example.demo.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.repositry.EmployeeRepositry;






@Service
public class EmployeeService {
	@Autowired
	EmployeeRepositry erepo;
	@Autowired
	EmployeeRepositry lrepo;
	
	public List<Employee> getAll()
	{
		return erepo.findAll();
	}	
	public boolean save(Employee c)
	{
		return erepo.save(c) != null;
	}
	public Employee getEmployee(int pid) 
	{
	 return erepo.findById(pid).get();
		
	}
	
	
	public Employee updateEmployee(Employee emp,int Empolyee_id)
	{
		Employee p=erepo.findById(Empolyee_id).get();
		p.setFirst_name(emp.getFirst_name());
		p.setLast_name(emp.getLast_name());
		p.setDepartment(emp.getDepartment());
		p.setGender(emp.getGender());
		p.setLocation(emp.getLocation());
		p.setPhone(emp.getPhone());
		p.setJoin_date(emp.getJoin_date());
		p.setJob_title(emp.getJob_title());
	
		
		return erepo.save(p);
	}
	
	public Employee getEmployee(Login l)
	{
		return erepo.getEmployee(l);
	}
	

}

