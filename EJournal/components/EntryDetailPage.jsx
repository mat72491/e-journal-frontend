import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EntryDetailPage = () => {
  const { id } = useParams();  // Get the entry ID from the URL
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  
  // Function to fetch the entry data
  const fetchEntry = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/entries/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entry:', error);
    }
  };

  // Fetch the entry when the component mounts or when `id` changes
  useEffect(() => {
    fetchEntry();
  }, [id]);  // Dependency on `id` ensures it re-fetches when the ID changes

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user may be logged out');
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/entries/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/dashboard/'); 
    } catch (error) {
      console.error('Error deleting entry:', error);
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized, the user might be logged out');
        navigate('/login');
      } else {
        alert('An error occurred while deleting the entry. Please try again.');
      }
    }
  };

  if (!entry) return <p>Loading...</p>;

  return (
    <div>
      <h1>{entry.title}</h1>
      <p>{entry.content}</p>

      <button onClick={() => navigate(`/entries/${id}/edit`)}>Edit Entry</button>
      <button onClick={handleDelete}>Delete Entry</button>
    </div>
  );
};

export default EntryDetailPage;