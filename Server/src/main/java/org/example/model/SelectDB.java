package org.example.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SelectDB {
    //Setup of database propertiest
    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    //For login (mainly)
    public boolean SelectUserQuery(String username1, String password1) {
        //Changed statement to prepared statement to prevent sql injection
        System.out.println(username + " " + password);
        String query = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection connection = DriverManager.getConnection(url, username, password);//Establishes connection and sets values in query
            PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, username1);
            statement.setString(2, password1);
            try(ResultSet resultSet = statement.executeQuery();){
             return resultSet.next();}
             catch (SQLException e) {
                e.printStackTrace();
                System.out.println("Error: Unable to fetch data from the database!");
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error: Unable to fetch data from the database!");
            return false;
        }
    }
    //Method for if user exists but password was wrong
    public boolean  SelectUsernameQuery(String username1, String password1) {
        //Changed statement to prepared statement to prevent sql injection
        String query = "SELECT * FROM users WHERE username = ? AND password != ?";

        try (Connection connection = DriverManager.getConnection(url, username, password);//Establishes connection and sets values in query
            PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, username1);
            statement.setString(2, password1);
            try(ResultSet resultSet = statement.executeQuery()){
                return resultSet.next();}
                catch (SQLException e) {
                   e.printStackTrace();
                   System.out.println("Error: Unable to fetch data from the database!");
                   return false;
               }
           } catch (SQLException e) {
               e.printStackTrace();
               System.out.println("Error: Unable to fetch data from the database!");
               return false;
           }
    } public ArrayList<Issue> GetIssues(String username1){
        ArrayList<Issue> issueList = new ArrayList<Issue>();
        //query for getting the issues
        String query = "SELECT issuename, issuestatus, description, creation " + 
                        "FROM issues " + 
                        "WHERE id = (SELECT id FROM users WHERE username = ?)";

        try (Connection connection = DriverManager.getConnection(url, username, password);//Establishes connection
            PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, username1);
            try(ResultSet resultSet = statement.executeQuery()){
                while(resultSet.next()){
                    //Iterates through the rows and appends to the list
                    issueList.add(new Issue(resultSet.getString("issuename"), 
                    resultSet.getString("description"), 
                    resultSet.getString("issuestatus"), 
                    resultSet.getString("creation")));
                }return issueList;}
                catch (SQLException e) {
                   e.printStackTrace();
                   System.out.println("Error: Unable to fetch data from the database!");
                   return null;
               }
           } catch (SQLException e) {
               e.printStackTrace();
               System.out.println("Error: Unable to fetch data from the database!");
               return null;
           }
    }

}

