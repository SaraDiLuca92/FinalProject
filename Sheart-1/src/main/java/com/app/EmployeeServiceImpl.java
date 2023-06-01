package com.app;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

  @Autowired
  private EmployeeRepo employeeRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public String registerEmployee(String name, String password,int id) {
    // Logica per registrare l'utente nel database
    Users employee = new Users();
    employee.setUsername(name);
    employee.setPassword(passwordEncoder.encode(password));
    employee.setId(id);
    employeeRepo.save(employee);

    return employee.getUsername();
  }

  @Override
  public LoginResponse loginEmployee(String username, String password,int id) {
      // Logica per il login dell'utente
      Optional<Users> employeeOptional = employeeRepo.findByUsername(username);
      if (employeeOptional.isPresent()) {
          Users employee = employeeOptional.get();
          if (passwordEncoder.matches(password, employee.getPassword())) {
              return new LoginResponse("Login success", true);
          } 
      }
      return new LoginResponse("Login failed", false);
  }

}