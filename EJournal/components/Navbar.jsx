import React from 'react';
import { Link } from 'react-router-dom'; 


function Navbar(props) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li>
          <Link to="/write-entry">Write Entry</Link> 
        </li>
        <li>
          <Link to="/entries">My Entries</Link> 
        </li>

          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
  
      </ul>
    </nav>
  );
}

export default Navbar;