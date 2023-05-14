package com.example.demo.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.LeaveType;

@Repository
public interface LeaveTypeReprository extends JpaRepository<LeaveType, Integer>{

	
}
