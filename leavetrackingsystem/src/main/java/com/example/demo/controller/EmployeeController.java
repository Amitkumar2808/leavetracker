package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Department;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Manager;
import com.example.demo.entities.Register;
import com.example.demo.service.DepartmentService;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.LoginService;
import com.example.demo.service.ManagerService;




@CrossOrigin(origins ="*")
@RestController
public class EmployeeController {

	@Autowired
	EmployeeService eservice;
	
	@Autowired
	ManagerService mservice;
	
	@Autowired
	DepartmentService dservice;
	
	@Autowired
	LoginService lservice;
	
	@PostMapping("/registere")
	public boolean registerEmployee(@RequestBody Register pr)
	{
		boolean flag =true;
		
		try
		{ 
			Manager m=mservice.getManager(pr.getManaget_id());
			Department d=dservice.findById(pr.getDepartment_id());
			System.out.println(d);
			Login l=new Login( pr.getEmail(),pr.getPassword(),"employee");
			Login inserted=lservice.add(l);
			System.out.println(l);
			System.out.println(pr.getFirst_name()+"  "+pr.getLast_name()+"  "+pr.getGender()
			+"  "+pr.getPhone()+"  "+pr.getEmail()+"  "+pr.getPassword()+"  "+pr.getJob_title()+"  "+d+"  "+pr.getLocation()
			+"  "+pr.getJoin_date()+"  "+pr.getManaget_id()+"  "+inserted);
			Employee p=new Employee(pr.getFirst_name(),pr.getLast_name(),pr.getGender()
					,pr.getPhone(),pr.getEmail(),pr.getPassword(),pr.getJob_title(),d,pr.getLocation()
					,pr.getJoin_date(),m,inserted);
			eservice.save(p);
			
			
		}
		catch (Exception e)
		{
			System.out.println(e);
			flag=false;
		}
		
		return flag;
		
		
	}	
	
	@GetMapping("/allemployee")
	public List<Employee> getAll()
	{
		return eservice.getAll();
		
	}
	@PostMapping("/saveemployeet")
	public boolean SaveEmployee(@RequestBody Employee C)
	{
		return eservice.save(C);
	}
	@GetMapping("/getemployee")
	public Employee getEmployee(@RequestParam("employee_id") int eid)
	{
		return eservice.getEmployee(eid);
	}
	
	
	@PostMapping("/updateemployee")
	public Employee updateEmployee (@RequestBody Employee emp,@RequestParam("employee_id") int pid)
	{
		return eservice.updateEmployee(emp, pid);
		
	}
	
	@PostMapping("/getEmployee")
	public Employee getEmployee(@RequestBody Login l)
	{
		return eservice.getEmployee(l);
	}
	@GetMapping("/getEmployeebylogin")
	public Employee getEmployeebylogin(@RequestParam("login_id") int lid)
	{
		Login l=lservice.find(lid);
		return eservice.getEmployee(l);
	}
	
	
}

