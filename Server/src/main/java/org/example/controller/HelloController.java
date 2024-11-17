package org.example.controller;

import org.example.model.SelectDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {
    private final SelectDB SelectDB;
    @Autowired
    public HelloController(SelectDB selectDB) {
        this.SelectDB = selectDB;
    }
    @GetMapping("/api/ping")
    public Boolean ping(){
        return true;
    } 
    @GetMapping("/api/login")
    public Boolean login(@RequestParam String username, @RequestParam String password){
        return ;
    }

}