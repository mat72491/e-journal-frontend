import { useState, useEffect } from 'react';
import axios from 'axios';

const WriteEntry = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    // Fetch tags from the backend
    axios.get('http://127.0.0.1:8000/tags/')
      .then(response => {
        setTagOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleTagChange = (e) => {
    const value = e.target.value;
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      entry,
      tags: selectedTags,
    };

    axios.post('http://127.0.0.1:8000/entries/create/', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      console.log('Journal entry created:', response.data);
      // Optionally clear the form or redirect
    })
    .catch(error => {
      console.error('Error creating journal entry:', error);
    });
  };

  return (
    <div>
      <h2>Write a New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Entry:</label>
          <textarea 
            value={entry} 
            onChange={(e) => setEntry(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Tags:</label>
          <select multiple value={selectedTags} onChange={handleTagChange}>
            {tagOptions.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WriteEntry;