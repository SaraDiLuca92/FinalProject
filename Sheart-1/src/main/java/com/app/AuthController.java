package com.app;
import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private EmployeeService employeeService;
  @Autowired
  private EmployeeRepo employeerepo;

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
    String username = registerRequest.getUsername();
    String password = registerRequest.getPassword();
    int id=registerRequest.getId();

    // Logica per la registrazione dell'utente utilizzando il servizio EmployeeService
    String employeeName = employeeService.registerEmployee(username, password, id);

    return ResponseEntity.ok("Registrazione avvenuta con successo. Benvenuto, " + employeeName + "!");
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    String username = loginRequest.getUsername();
    String password = loginRequest.getPassword();
    int id=loginRequest.getId();
    

    // Logica per il login dell'utente utilizzando il servizio EmployeeService
    LoginResponse loginResponse = employeeService.loginEmployee(username, password, id);

    if (loginResponse.isSuccess()) {
      return ResponseEntity.ok(loginResponse);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
    }
  }
  @GetMapping("/")
  public List<Users>getUsers(){return employeerepo.findAll();}
  
  
  }


