import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IndexPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/entries/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div>
      <h1>Your Journal Entries</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link to={`/entries/${entry.id}`}>
              <h3>{entry.title}</h3>
              <p>{entry.content.slice(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;