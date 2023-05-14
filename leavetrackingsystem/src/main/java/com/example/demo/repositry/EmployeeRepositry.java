package com.example.demo.repositry;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import com.example.demo.entities.Login;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface EmployeeRepositry extends JpaRepository<Employee, Integer> {
	@Query("select l  from Employee l where login.login_id=:uid")
	public Optional<Employee> loginid(int uid);

	@Query("select d from Employee d where login=:l")
	public Employee getEmployee(Login l);

	

	

}

