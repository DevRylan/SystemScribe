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
        System.out.println("Username: "+username1);
        ArrayList<Issue> issueList = new ArrayList<Issue>();
        //query for getting the issues
        String query = "SELECT id, issuename, issuestatus, description, creation, os, severity, email " + 
                        "FROM issues " + 
                        "WHERE userid = (SELECT id FROM users WHERE username = ?) AND isDeleted = FALSE";

        try (Connection connection = DriverManager.getConnection(url, username, password);//Establishes connection
            PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, username1);
            try(ResultSet resultSet = statement.executeQuery()){
                while(resultSet.next()){
                    //Iterates through the rows and appends to the list
                    issueList.add(new Issue(resultSet.getString("issuename"), 
                    resultSet.getString("description"), 
                    resultSet.getString("creation"), 
                    resultSet.getString("issuestatus"),
                    resultSet.getInt("id"),
                    resultSet.getString("os"),
                    resultSet.getString("severity"),
                    resultSet.getString("email")));
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
    } public ArrayList<Issue> GetAllIssues(){
        ArrayList<Issue> issueList = new ArrayList<Issue>();
        //query for getting the issues
        String query = "SELECT id, issuename, issuestatus, description, creation, os, severity, email " + 
                        "FROM issues " + 
                        "WHERE isDeleted = FALSE";
        System.out.println("Attempting to Get All Issues");
        try (Connection connection = DriverManager.getConnection(url, username, password);//Establishes connection
            PreparedStatement statement = connection.prepareStatement(query)) {
            try(ResultSet resultSet = statement.executeQuery()){
                while(resultSet.next()){
                    //Iterates through the rows and appends to the list
                    issueList.add(new Issue(resultSet.getString("issuename"), 
                    resultSet.getString("description"), 
                    resultSet.getString("creation"), 
                    resultSet.getString("issuestatus"),
                    resultSet.getInt("id"),
                    resultSet.getString("os"),
                    resultSet.getString("severity"),
                    resultSet.getString("email")));
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
    public int SelectUserId(String Username1){
        String query = "SELECT id FROM users WHERE username = ?";
        try (Connection connectionID = DriverManager.getConnection(url, username, password);
             PreparedStatement statementID = connectionID.prepareStatement(query)) {
             statementID.setString(1, Username1);
             try(ResultSet resultSet = statementID.executeQuery();){
                if (resultSet.next()) { 
                    return resultSet.getInt("id"); 
                } else {
                    System.out.println("No user found with username");
                    return -1; 
                }
             }
        }
         catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error: Unable to fetch data from the database!");
            return -1;
        }
    }
    public String SelectUserEmail(int UserId){
        String query = "SELECT email FROM issues WHERE id = ?";
        try (Connection connectionID = DriverManager.getConnection(url, username, password);
             PreparedStatement statementID = connectionID.prepareStatement(query)) {
             statementID.setInt(1, UserId);
             try(ResultSet resultSet = statementID.executeQuery();){
                if (resultSet.next()) { 
                    return resultSet.getString("email"); 
                } else {
                    System.out.println("No user found with username");
                    return null; 
                }
             }
        }
         catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error: Unable to fetch data from the database!");
            return null;
        }
    }

}

