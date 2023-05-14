package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Employee;
import com.example.demo.entities.LeaveType;
import com.example.demo.entities.Leaves;
import com.example.demo.entities.Manager;
import com.example.demo.service.EmailSenderService;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.LeaveService;
import com.example.demo.service.LeaveTypeService;
import com.example.demo.service.ManagerService;
import com.example.demo.vo.SaveLeaveVo;




@CrossOrigin(origins ="*")
@RestController
public class LeaveController {
	
	@Autowired
	EmailSenderService emserv;

	@Autowired
	LeaveService lservice;
	
	@Autowired
	LeaveTypeService ltservice;
	
	@Autowired
	EmployeeService eservice;
	
	@Autowired
	ManagerService mservice;
	
	
	
	@PostMapping("/saveleave")
	public boolean SaveLeave(@RequestBody SaveLeaveVo c)
	{
		
		 
try {
	Manager m=mservice.getManager(c.getManager_id());
		Employee employee = eservice.getEmployee(c.getEmployee_id());
		LeaveType leave=ltservice.findById(c.getLeavetype_id());
		Leaves l=new Leaves(c.getNuleaves(),c.getStart_date(),c.getEnd_date(),c.getComment(),c.getStatus(),employee,leave,m);
		System.out.println(c.getEnd_date()+" "+c.getStart_date()+" "+m+" "+employee);
		
		 emserv.SendEmail("vikas1.yadav95@gmail.com", m.getEmail(), "Leave Request.", "hello "+ m.getFirst_name() +" "+m.getLast_name()+", \n you recived a leave request from "+employee.getEmail()+" \n for "+ l.getNuleavs()+" days  start from "+l.getStart_date()+" and end at "+l.getEnd_date()+" . \n so, please go through it and take required decision. \n thank you");
			
		return lservice.save(l);
		
	}
catch (Exception e) {
	e.printStackTrace();

return false;
}
	}
	
	
	@GetMapping("/allpendingleaves")
	public List<Leaves> getAllPending()
	{
		return lservice.getAllpending();
		
	}
	
	@GetMapping("/allpendingleavesbydept")
	public List<Leaves> getAllPendingbydept(@RequestParam("manager_id")int id)
	{
		return lservice.getAllpendingbydept(id);
		
	}
	
	@PostMapping("/updateleave")
	public Leaves updateLeave(@RequestParam("leave_id") int lid,@RequestParam("status") String st)
	{
		return lservice.updateLeave(st,lid);
	}
	
	@GetMapping("/allLeaves")
	public List<Leaves> getAll()
	{
		return lservice.getAll();
		
	}
	@GetMapping("/allLeavestype")
	public List<LeaveType> getAll1()
	{
		return ltservice.getAll();
		
	}
	@GetMapping("/getleavebyempid")
	public List<Leaves> getLeave(@RequestParam("employee_id") int eid)
	{
		return lservice.getleavebyempid(eid);
	}
	
	
}

