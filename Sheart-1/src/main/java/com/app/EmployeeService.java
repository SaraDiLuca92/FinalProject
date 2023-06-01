package com.app;

public interface EmployeeService {
	  String registerEmployee(String username, String password,int id);
	  LoginResponse loginEmployee(String username, String password,int id);
	}