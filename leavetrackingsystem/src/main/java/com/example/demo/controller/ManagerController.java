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
import com.example.demo.entities.Login;
import com.example.demo.entities.Manager;
import com.example.demo.entities.Register;
import com.example.demo.service.DepartmentService;
import com.example.demo.service.LoginService;
import com.example.demo.service.ManagerService;


@CrossOrigin(origins ="*")
@RestController
public class ManagerController {
	@Autowired
	ManagerService mservice;
	
	@Autowired
	LoginService lservice;
	
	@Autowired
	DepartmentService dservice;
	
	@PostMapping("/registerm")
	public boolean registerManager(@RequestBody Register pr)
	{
		boolean flag =true;
		
		try
		{   
			Department d=dservice.findById(pr.getDepartment_id());
			Login l=new Login( pr.getEmail(),pr.getPassword(),"manager");
			Login inserted=lservice.add(l);
			Manager m=new Manager(pr.getFirst_name(),pr.getLast_name(),pr.getPhone(),
					pr.getEmail(),pr.getJob_title(),pr.getLocation(),
					pr.getJoin_date(),pr.getGender(),pr.getPassword(),d,inserted);
			mservice.save(m);
			
			
		}
		catch (Exception e)
		{
			System.out.println("exception occur");
			flag=false;
		}
		
		return flag;
		
		
	}	
	
	@GetMapping("/allmanager")
	public List<Manager> getAll()
	{
		return mservice.getAll();
		
	}
	@PostMapping("/savemanagert")
	public boolean SaveManager(@RequestBody Manager C)
	{
		return mservice.save(C);
	}
	@GetMapping("/getmanager")
	public Manager getManager(@RequestParam("manager_id") int eid)
	{
		return mservice.getManager(eid);
	}
	
	@GetMapping("/getmanagerbydept")
	public List<Manager> getManagerByDept(@RequestParam("department_id") int did)
	{
		return mservice.getManagerByDept(did);
	}
	
	
	@PostMapping("/updatemanager")
	public Manager updateManager (@RequestBody Manager mp,@RequestParam("manager_id") int pid)
	{
		return mservice.updateManager(mp, pid);
		
	}
	
	@PostMapping("/getManager")
	public Manager getEmployee(@RequestBody Login l)
	{
		return mservice.getManager(l);
	}
	@GetMapping("/getManagerbylogin")
	public Manager getManagerbylogin(@RequestParam("login_id") int lid)
	{
		Login l=lservice.find(lid);
		return mservice.getManager(l);
	}
}

