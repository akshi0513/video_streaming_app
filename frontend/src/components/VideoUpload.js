import { useState } from 'react';
import { uploadVideo } from '../api';
import './VideoUpload.css';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', tags: '' });
  const [loading, setLoading] = useState(false); // Loading state for upload
  const [error, setError] = useState(null);     // Error state for handling errors

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setLoading(true);  // Start the loading state
    setError(null);    // Clear any previous errors

    const formData = new FormData();
    formData.append('video', file); // Video field must match the backend field name
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('tags', form.tags);

    try {
      await uploadVideo(formData); // Call the API function to upload video
      alert('Video uploaded successfully!');
      
      // Clear the form and file after successful upload
      setForm({ title: '', description: '', tags: '' });
      setFile(null);
      document.getElementById('fileInput').value = ''; // Reset file input
    } catch (error) {
      console.error('Error uploading video:', error.response?.data?.error || error.message);
      setError('Failed to upload video. Please try again.');
    } finally {
      setLoading(false);  // Stop the loading state
    }
  };

  return (
    <div className="container">
      <h2>Upload Video</h2>
      {loading && <p>Uploading... Please wait.</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleUpload}>
        <input 
          type="text" 
          placeholder="Title" 
          value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Tags (comma separated)" 
          value={form.tags} 
          onChange={(e) => setForm({ ...form, tags: e.target.value })} 
        />
        <input 
          id="fileInput" 
          type="file" 
          accept="video/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
}  

export default VideoUpload;
