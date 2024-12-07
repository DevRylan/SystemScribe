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
    @JsonProperty("issueId")
    private int issueId;
    @JsonProperty("os")
    private String os;
    @JsonProperty("severity")
    private String severity;
    @JsonProperty("email")
    private String email;

    public Issue(String issueName, String description, String creationTime, String issueStatus, int issueId, String os, String severity, String email){
        this.issueName = issueName;
        this.description = description;
        this.creationTime = creationTime;
        this.issueStatus = issueStatus;
        this.issueId = issueId;
        this.os = os;
        this.severity = severity;
        this.email = email;
    }
}
