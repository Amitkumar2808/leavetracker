package com.example.demo.repositry;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.*;

@Repository
public interface LeaveReprositry extends JpaRepository<Leaves, Integer>{

	
	@Query("select l  from Leaves l where employee.E_id=:eid")
	public List<Leaves> getleavebyempid(int eid);

	@Query("select l from Leaves l where status='pending'")
	public List<Leaves> getAllPending();
	
	@Query("select l from Leaves l where status='pending' and manager.m_id=:id")
	public List<Leaves> getAllpendingbydept(int id);
	
	
	

	

	
}

