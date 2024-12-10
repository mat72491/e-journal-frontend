import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for routing without reloading the page
import LogoutButton from './LogoutButton'; // Import LogoutButton component

function Navbar() {
  return (
    <nav>
      <ul>
        {/* Add navigation links */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li>
          <Link to="/write-entry">Write Entry</Link> {/* Link to Write Entry page */}
        </li>
        {localStorage.getItem('token') && (
          <li>
            <LogoutButton /> {/* Add logout button */}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;