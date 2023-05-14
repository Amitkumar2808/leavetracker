
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
import com.example.demo.entities.ManagerLeave;
import com.example.demo.service.EmailSenderService;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.LeaveService;
import com.example.demo.service.LeaveTypeService;
import com.example.demo.service.ManagerLeaveService;
import com.example.demo.service.ManagerService;
import com.example.demo.vo.SaveLeaveVo;




@CrossOrigin(origins ="*")
@RestController
public class ManagerLeaveController {
	
	@Autowired
	EmailSenderService emserv;

	@Autowired
	ManagerLeaveService mlservice;
	
	@Autowired
	LeaveTypeService ltservice;
	
	@Autowired
	EmployeeService eservice;
	
	@Autowired
	ManagerService mservice;
	
	
	
	@PostMapping("/savemangleave")
	public boolean SaveLeave(@RequestBody SaveLeaveVo c)
	{
		
		 
try {
	Manager m=mservice.getManager(c.getManager_id());
		
		LeaveType leave=ltservice.findById(c.getLeavetype_id());
		ManagerLeave l=new ManagerLeave(c.getNuleaves(),c.getStart_date(),c.getEnd_date(),c.getComment(),c.getStatus(),leave,m);
		System.out.println(c.getEnd_date()+" "+c.getStart_date()+" "+m);
		
		 emserv.SendEmail("vikas1.yadav95@gmail.com", "admin@gmail.com", "Leave Request.", "hello "+ m.getFirst_name() +" "+m.getLast_name()+", \n you recived a leave request from  \n for "+ l.getNuleavs()+" days  start from "+l.getStart_date()+" and end at "+l.getEnd_date()+" . \n so, please go through it and take required decision. \n thank you");
			
		return mlservice.save(l);
		
	}
catch (Exception e) {
	e.printStackTrace();

return false;
}
	}
	
	
	@GetMapping("/allmangpendingleaves")
	public List<ManagerLeave> getAllPending()
	{
		return mlservice.getAllpending();
		
	}
	
	
	
	@PostMapping("/updatemangleave")
	public ManagerLeave updateLeave(@RequestParam("leave_id") int lid,@RequestParam("status") String st)
	{
		return mlservice.updateLeave(st,lid);
	}
	
	@GetMapping("/allmangLeaves")
	public List<ManagerLeave> getAll()
	{
		return mlservice.getAll();
		
	}
	
	@GetMapping("/getleavebymangid")
	public List<ManagerLeave> getLeave(@RequestParam("manager_id") int eid)
	{
		return mlservice.getleavebyempid(eid);
	}
	
	
}

