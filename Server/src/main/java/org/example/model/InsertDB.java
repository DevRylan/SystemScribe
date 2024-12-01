package org.example.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class InsertDB {
    private final SelectDB SelectDB;

    @Autowired
    public InsertDB(SelectDB selectDB) {
        this.SelectDB = selectDB;
    }

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    public void InsertUserQuery(String username1, String password1) {
        String query = "INSERT INTO users (username, password) VALUES (?, ?)";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(query)) {
             statement.setString(1, username1);
             statement.setString(2, password1);
             statement.executeUpdate();
        }
         catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error: Unable to fetch data from the database!");
        }
    }
    public void InsertIssueQuery(String username1, String title, String description, String os, String severity) {
        String query = "INSERT INTO issues (userid, issuename, description, os, severity) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = connection.prepareStatement(query)) {
             //Formatting for the query
             statement.setInt(1, SelectDB.SelectUserId(username1));
             statement.setString(2, title);
             statement.setString(3, description);
             statement.setString(4, os);
             statement.setString(5, severity);
             statement.executeUpdate();
        }
         catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error: Unable to fetch data from the database!");
        }
    }

}
