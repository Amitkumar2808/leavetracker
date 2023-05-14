package com.example.demo.repositry;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Login;



@Repository
public interface LoginRepositry extends JpaRepository<Login,Integer> {
	
	@Query("select l from Login l where  email=:email and password=:pwd")
	public Login checkLogin(String email,String pwd);

}

