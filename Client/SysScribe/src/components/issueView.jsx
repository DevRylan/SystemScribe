import Axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

function IssueView(props){
    return(
        <div className="issue-view-container">
        <div className="issue-view default-text">
            <h3>Issue Name</h3>
            <h5 style={{marginTop: "8px", display: "flex", justifyContent: "end", marginRight: "25px"}}>Creation Time: 239023 502935 25</h5>
            <p className="test-grid">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, eius quam dolores itaque harum exercitationem corrupti necessitatibus magni earum aperiam ad dolorum culpa doloribus officia ipsum eveniet! Id, rerum necessitatibus?</p>
            <h5>Os: Windows</h5>
            <h5 style={{marginTop: "8px", display: "flex", justifyContent: "end", marginRight: "25px"}}>Severity: Severe</h5>
        </div>
        <div className= "default-text solution-form" style={{border: "01px solid black", borderRadius: "5px"}}>
            <h4>Solution: </h4>
            <textarea placeholder="List Detailed steps here..." className="admin-text-area"></textarea>
            <button className="btn btn-primary">Submit</button>
        </div>
        </div>
    );
}

export default IssueView;