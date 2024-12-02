package org.example.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.example.model.InsertDB;
import org.example.model.Issue;
import org.example.model.SelectDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class MainController {
    private final SelectDB SelectDB;
    private final InsertDB InsertDB;
    @Value("${spring.datasource.AdminPassword}")
    private String adminPassword;
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public MainController(SelectDB selectDB, InsertDB insertDB) {
        this.SelectDB = selectDB;
        this.InsertDB = insertDB;
    }
    @GetMapping("/api/ping")
    public Boolean ping(){
        return true;
    } 
    @PostMapping("/api/login")
    public ResponseEntity<Map<String, Object>> Login(@RequestBody Map<String, String> loginData) throws SQLException {
        //Parses data from react code 
        String username = loginData.get("username");
        String password = loginData.get("password");
        Map<String, Object> response = new HashMap<>();
        //Gets user values from the model
        System.out.println("Trying sql statement values: " +username+ " " +password);
        boolean results = SelectDB.SelectUserQuery(username, password);
        boolean userPass = SelectDB.SelectUsernameQuery(username, password);        
        System.out.println("Trying condition...");

        if (results) {//if login is successful
            response.put("login", true);
            //For authentication
            response.put("auth", username);
            return ResponseEntity.ok(response);
        }
        else if(userPass){//if password is incorrect
            response.put("login", false);
            response.put("reason", "Invalid Password");
            return ResponseEntity.ok(response);
        }
        else{//is username doesnt exist
            response.put("login", false);
            response.put("reason", "User does not exist. Try Registering?");
            return ResponseEntity.ok(response);
        }
    }
    @PostMapping("/api/register")
    public ResponseEntity<Map<String, Object>> Register(@RequestBody Map<String, String> registerData) throws SQLException{
        //Parsing register info and passint to query
        String username = registerData.get("username");
        String password = registerData.get("password");
        Map<String, Object> response = new HashMap<>();
        boolean results = SelectDB.SelectUserQuery(username, password);
        if (results) {//if user exists
            response.put("register", false);
            response.put("reason", "user exists");
            return ResponseEntity.ok(response);
        }else{
            InsertDB.InsertUserQuery(username, password);
            response.put("register", true);
            return ResponseEntity.ok(response);
        }
    }
    @PostMapping("/api/report-issue")
    public void ReportIssue(@RequestBody Map<String, String> reportData){
        //Format for using query method to insert issue data 
        String username1 = reportData.get("username");
        String title = reportData.get("title");
        String description = reportData.get("description");
        String os = reportData.get("os");
        String severity = reportData.get("severity");
        InsertDB.InsertIssueQuery(username1, title, description, os, severity);
    }
    @PostMapping("/api/delete-issue")
    public void DeleteIssue(@RequestBody Map<String, Integer> issueId){
        int Id = issueId.get("issueId");
        InsertDB.DeleteIssueQuery(Id);
    }
    @GetMapping("/api/auth")
    public boolean Auth(@RequestParam(name = "user") String user) {
        //For checking cookie value passed by user
        String username = user;
        System.out.println("this is the user: "+username);
        boolean results = SelectDB.SelectUsernameQuery(username," ");
        return results;
    }
    @GetMapping("/api/get-issues")
    public ArrayList<Issue> getIssues(@RequestParam(name = "user") String username) {
        String user = username;
        return SelectDB.GetIssues(user);
    }
    @GetMapping("/api/check-admin")
    public ResponseEntity<Map<String, Object>> Login(@RequestParam(name = "user") String password){
        System.out.println("The password is: " +password);
        Map<String, Object> response = new HashMap<>();
        if(password.equals(adminPassword)){
            response.put("login", true);
            return ResponseEntity.ok(response);
        }return ResponseEntity.ok(response);
    }
}