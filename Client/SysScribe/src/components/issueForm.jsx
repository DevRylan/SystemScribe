import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function IssueForm() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [os, setOS] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(()=>{
    const authData = JSON.parse(localStorage.getItem('auth'));
    setUsername(authData);
    console.log('Data: '+authData);
    if (authData) {
        const isUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth', {
                    params: { user: authData }
                });
        console.log('Response: ', response.data);
        if (response.data) {
                console.log('It worked');
        } else {
                console.log('User not found');
                navigate('/login');
        }
    } catch (e){
        navigate('/login');
    }
    isUser();
    }}
    else{
        navigate('/login');
    }}, 
    []);

    async function handleSubmit(event) {
        event.preventDefault();
      
        const issueData = { username: username, title: title, description: description, os: os, severity: severity, email: email };
      
        try {
          await axios.post("http://localhost:8080/api/report-issue", issueData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          setIsSubmitted(true);
        } catch (error) {
          console.error("Error submitting the issue:", error);
        }
      }
      
      React.useEffect(() => {
        if (isSubmitted) {
          navigate('/menu');
        }
      }, [isSubmitted]);
      
      

  return (
    <div className="issue-form">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "30%",
          alignItems: "start",
          marginTop: "10px",
        }}
        method="POST"
        className="issue-submit-form"
      >
        <h5 className="default-text">Issue Title:</h5>
        <input
          type="text"
          style={{ width: "40%", backgroundColor: "rgb(51, 51, 51)" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h5 className="default-text">Your Email:</h5>
        <input
          type="text"
          style={{ width: "40%", backgroundColor: "rgb(51, 51, 51)" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h5 className="default-text">Issue Description:</h5>
        <textarea
          style={{ width: "95%", height: "250px", backgroundColor: "rgb(51, 51, 51)" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            width: "95%",
            flexDirection: "column",
            gap: "10px",
            alignItems: "start",
          }}
        >
          <div id="osForm" className="default-text">
            <p>Select Operating System</p>
            <label>
              <input
                type="radio"
                name="os"
                value="windows"
                onChange={(e) => setOS(e.target.value)}
              />
              Windows
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="os"
                value="linux"
                onChange={(e) => setOS(e.target.value)}
              />
              Linux
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="os"
                value="macos"
                onChange={(e) => setOS(e.target.value)}
              />
              MacOS
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="os"
                value="other"
                onChange={(e) => setOS(e.target.value)}
              />
              Other
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="os"
                value="na"
                onChange={(e) => setOS(e.target.value)}
              />
              N/A
            </label>
          </div>
          <div id="severityForm" className="default-text">
            <p>Please Select the Severity Level</p>
            <label>
              <input
                type="radio"
                name="severity"
                value="Severe"
                onChange={(e) => setSeverity(e.target.value)}
              />
              Severe
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="severity"
                value="Moderate"
                onChange={(e) => setSeverity(e.target.value)}
              />
              Moderate
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="severity"
                value="Mild"
                onChange={(e) => setSeverity(e.target.value)}
              />
              Mild
            </label>
          </div>
        </div>
      </form>
      <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default IssueForm;
