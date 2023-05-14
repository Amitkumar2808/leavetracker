package com.example.demo.repositry;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Login;
import com.example.demo.entities.Manager;

@Repository
public interface ManagerReprository extends JpaRepository<Manager, Integer>{

	@Query("select l  from Manager l where login.login_id=:uid")
	public Optional<Manager> loginid(int uid);

	@Query("select d from Manager d where login=:l")
	public Manager getManager(Login l);

	@Query("select d from Manager d where department.department_id=:did")
	public List<Manager> getManagerByDept(int did);

	

}

