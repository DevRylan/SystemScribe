package org.example.model;

public class Issue {
    private String issueName;
    private String description;
    private String creationTime;
    private String issueStatus;

    public Issue(String issueName, String description, String creationTime, String issueStatus){
        this.issueName = issueName;
        this.description = description;
        this.creationTime = creationTime;
        this.issueStatus = issueStatus;
    }
}
