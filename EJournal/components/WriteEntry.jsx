import { useState, useEffect } from 'react';
import axios from 'axios';

const WriteEntry = () => {
    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [notification, setNotification] = useState('');
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/tags/')
            .then(response => {
                setTagOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching tags:', error);
            });
    }, []);

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedTags(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title,
            content: entry,
            tags: selectedTags,
        };

        axios.post('http://127.0.0.1:8000/entries/create/', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            console.log('Journal entry created:', response.data);
            setNotification('Journal entry submitted successfully!'); 
      
            setTitle('');
            setEntry('');
            setSelectedTags([]);
    
            setTimeout(() => setNotification(''), 3000);
          })
          .catch(error => {
            console.error('Error creating journal entry:', error);
            setNotification('Failed to submit journal entry. Please try again.'); 
          });
        };

    return (
        <div>
            <h2>Write a New Journal Entry</h2>
      {notification && <div style={{ color: 'green', marginBottom: '10px' }}>{notification}</div>}
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