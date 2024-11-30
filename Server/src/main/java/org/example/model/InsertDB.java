package org.example.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class InsertDB {

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
}
