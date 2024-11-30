import Axios from 'axios';
import React from 'react';

function Header(){
    const [online, setOnline] = React.useState(false);

    React.useEffect(()=>{
        const pingServer = async () => {
            console.log('Trying');
            try {
            await Axios.get('http://localhost:8080/api/ping')
            setOnline(true);
        } catch(err){
            setOnline(false);
            }
        };

        const intereval = setInterval(pingServer, 3000);
        pingServer();

    }, []);
    return(
    <div id='header'>
        <h3 className="default-text">SysScribe</h3>
        <h3 className="default-text">STATUS: {online ? "ONLINE" : "OFFLINE"}</h3>
    </div>);
}
export default Header;