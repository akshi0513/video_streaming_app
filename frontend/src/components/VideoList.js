import { useState, useEffect } from 'react';
import { fetchVideos } from '../api';
import { Link } from 'react-router-dom';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]); // Initialize videos as an empty array
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetchVideos(search, page);

        // Safeguard: Ensure that response.data.videos is an array
        const videoList = response.data.videos || []; // If undefined, set it to an empty array
        setVideos(videoList); // Ensure the response has data before updating the state
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]); // In case of error, set an empty array
      }
    };

    loadVideos();
  }, [search, page]);

  return (
    <div className="container">
      <h2>Video List</h2>
      <input
        type="text"
        placeholder="Search videos..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video._id}>
              <Link to={`/videos/${video._id}`}>{video.title}</Link>
            </li>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} disabled={videos.length === 0}>
        Next
      </button>
    </div>
  );
};

export default VideoList;
