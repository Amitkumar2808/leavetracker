package com.example.demo.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Login;
import com.example.demo.entities.Manager;
import com.example.demo.repositry.LoginRepositry;
import com.example.demo.repositry.ManagerReprository;




@Service
public class ManagerService {

	@Autowired
	ManagerReprository mrepo;
	
	@Autowired
	LoginRepositry lrepo;
	
	public List<Manager> getAll()
	{
		return mrepo.findAll();
	}	
	public boolean save(Manager c)
	{
		return mrepo.save(c) != null;
	}
	public Manager getManager(int pid) 
	{
	 return mrepo.findById(pid).get();
		
	}
	
	
	public Manager updateManager(Manager emp,int Manager_id)
	{
		Manager p=mrepo.findById(Manager_id).get();
		p.setFirst_name(emp.getFirst_name());
		p.setLast_name(emp.getLast_name());
		p.setDepartment(emp.getDepartment());
		p.setGender(emp.getGender());
		p.setLocation(emp.getLocation());
		p.setPhone(emp.getPhone());
		p.setJoin_date(emp.getJoin_date());
		p.setJob_title(emp.getJob_title());
		
		
		return mrepo.save(p);
	}
	
	public Manager getManager(Login l)
	{
		return mrepo.getManager(l);
	}
	public List<Manager> getManagerByDept(int did) {
		
		return mrepo.getManagerByDept(did);
	}
	

}

