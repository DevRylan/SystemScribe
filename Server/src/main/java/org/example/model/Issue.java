package org.example.model;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Issue {
    @JsonProperty("issueName")
    private String issueName;
    @JsonProperty("description")
    private String description;
    @JsonProperty("creationTime")
    private String creationTime;
    @JsonProperty("issueStatus")
    private String issueStatus;

    public Issue(String issueName, String description, String creationTime, String issueStatus){
        this.issueName = issueName;
        this.description = description;
        this.creationTime = creationTime;
        this.issueStatus = issueStatus;
    }
}
