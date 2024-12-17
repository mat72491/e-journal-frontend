import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEntryPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    title: '',
    content: '',
    tags: [],
  });
  const [tagOptions, setTagOptions] = useState([]); 
  const [selectedTags, setSelectedTags] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem('token');
        const entryResponse = await axios.get(`https://ejournal-0a426b220645.herokuapp.com/entries/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntry(entryResponse.data); 
        setSelectedTags(entryResponse.data.tags || []); 
      } catch (error) {
        console.error('Error fetching entry:', error);
      } finally {
        setLoading(false); 
      }
    };

    const fetchTags = async () => {
      try {
        const token = localStorage.getItem('token');
        const tagsResponse = await axios.get('https://ejournal-0a426b220645.herokuapp.com/tags/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTagOptions(tagsResponse.data); 
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchEntry();
    fetchTags();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setSelectedTags(selectedOptions); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedEntry = {
        title: entry.title,
        content: entry.content,
        tags: selectedTags, 
      };

      const response = await axios.put(`https://ejournal-0a426b220645.herokuapp.com/entries/${id}/edit/`, updatedEntry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Updated entry response:', response.data); 
      navigate(`/entries/${id}`); 
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h1>Edit Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={entry.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label>Entry:</label>
          <textarea
            name="content"
            value={entry.content}
            onChange={handleChange}
            placeholder="Your entry"
            required
          />
        </div>
        <div>
          <label>Tags:</label>
          <select multiple value={selectedTags} onChange={handleTagChange}>
            {tagOptions.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEntryPage;