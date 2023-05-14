package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
	
	@Autowired
	JavaMailSender Sender;
	
	public void SendEmail(String from,String to, String sub, String body)
	{
		SimpleMailMessage mail=new SimpleMailMessage();
		mail.setFrom(from);			
		mail.setTo(to);			
		mail.setSubject(sub);			
		mail.setText(body);
		System.out.println("text");
		Sender.send(mail);
		System.out.println("mail send");
	}

}
