package org.example.controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.example.model.InsertDB;
import org.example.model.SelectDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {
    private final SelectDB SelectDB;
    private final InsertDB InsertDB;
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public HelloController(SelectDB selectDB, InsertDB insertDB) {
        this.SelectDB = selectDB;
        this.InsertDB = insertDB;
    }
    @GetMapping("/api/ping")
    public Boolean ping(){
        return true;
    } 
    @PostMapping("/api/login")
    public ResponseEntity<Map<String, Object>> Login(@RequestBody Map<String, String> loginData) throws SQLException {
        String username = loginData.get("username");
        String password = loginData.get("password");
        Map<String, Object> response = new HashMap<>();
        response.put("login", false);
        response.put("reason", "Invalid");
        System.out.println("Trying sql statement");
        ResultSet results = (ResultSet) SelectDB.SelectQuery("SELECT * FROM users WHERE username = "+username+" AND password = " +password);
       /* ResultSet userPass = (ResultSet) SelectDB.SelectQuery("SELECT * FROM users WHERE username = "+username+" AND password != "+password);        
        System.out.println("Trying condition...");
        if (userPass.next()){
        System.out.println("Trying inside...");
        System.out.println("Entering testMethod with username: " + userPass.getString("username"));
        }*/
        return ResponseEntity.ok(response);
        /*if (results != null && results.next()) {
            response.put("login", true);
            return ResponseEntity.ok(response);
        }
        else if(userPass != null && userPass.next()){
            response.put("login", false);
            response.put("reason", "Invalid Password");
            return ResponseEntity.ok(response);
        }
        else{
            response.put("login", false);
            response.put("reason", false);
            return ResponseEntity.ok(response);
        }*/
    }
    @GetMapping("/api/register")
    public ResponseEntity<Map<String, Object>> Register(@RequestParam String username, @RequestParam String password) throws SQLException{
        Map<String, Object> response = new HashMap<>();
        ResultSet results = (ResultSet) SelectDB.SelectQuery("SELECT * FROM users WHERE username = "+username);
        if (results != null && results.next()) {
            response.put("register", false);
            return ResponseEntity.ok(response);
        }else{
            InsertDB.InsertQuery("INSERT INTO users (username, password) VALUES ("+username+", "+password+")");
            response.put("register", true);
            return ResponseEntity.ok(response);
        }
    }

}