
package com.example.demo.repositry;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.*;

@Repository
public interface ManagerLeaveRepositry extends JpaRepository<ManagerLeave, Integer>{

	
	@Query("select l  from ManagerLeave l where manager.m_id=:eid")
	public List<ManagerLeave> getleavebyempid(int eid);

	@Query("select l from ManagerLeave l where status='pending'")
	public List<ManagerLeave> getAllPending();
	
	
	
	

	

	

	
}

