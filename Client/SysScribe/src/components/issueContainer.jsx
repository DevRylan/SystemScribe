import React from "react";
import Issue from "./issue";

function IssueContainer(){
    return(<div id="issue-container">
        <div id="issue-box">
            <Issue />
            <Issue />
            <Issue />
            <Issue />
        </div>
    </div>);
}
export default IssueContainer;