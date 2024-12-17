import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [entriesCount, setEntriesCount] = useState(0);
  const [topTags, setTopTags] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const entriesResponse = await axios.get('https://ejournal-0a426b220645.herokuapp.com/entries/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setEntriesCount(entriesResponse.data.length);

        const tagsResponse = await axios.get('https://ejournal-0a426b220645.herokuapp.com/tags/top/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTopTags(tagsResponse.data);


        const recentResponse = await axios.get('https://ejournal-0a426b220645.herokuapp.com/entries/recent/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRecentEntries(recentResponse.data);
      } catch (error) {
        console.error('Error fetching landing data:', error);
      } 
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Journal</h1>

      <div className="section">
        <h2>Entries Count</h2>
        <p>You have {entriesCount} journal entries.</p>
      </div>

      <div className="section">
        <h2>Top 3 Most Used Tags</h2>
        {topTags.length > 0 ? (
          <ul>
            {topTags.map(tag => (
              <li key={tag.id}>
                {tag.name} - {tag.count} entries
              </li>
            ))}
          </ul>
        ) : (
          <p>No tags found.</p>
        )}
      </div>

      <div className="section">
        <h2>Top 3 Most Recent Entries</h2>
        {recentEntries.length > 0 ? (
          <ul>
            {recentEntries.map(entry => (
              <li key={entry.id}>
                <strong>{entry.title}</strong> - {entry.date}
                <p>{entry.entry}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;