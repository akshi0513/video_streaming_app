import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { streamVideo } from '../api'; // Assuming this function returns the URL for streaming
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoSrc, setVideoSrc] = useState(null); // For storing the video URL
  const [loading, setLoading] = useState(true);   // For handling loading state
  const [error, setError] = useState(null);       // For handling errors

  // Fetch video source when the component mounts
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Fetch the video URL (assuming it points to a local file on the server)
        const src = await streamVideo(id);
        setVideoSrc(src); // Set the video source URL
        setLoading(false); // Set loading to false after the video URL is fetched
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video. Please try again later.');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return <p>Loading video...</p>; // Display loading message
  }

  if (error) {
    return <p>{error}</p>; // Display error message if video loading fails
  }

  return (
    <div className="video-player-container"> 
      <h2>Video Player</h2>
      {videoSrc ? (
        <video controls>
          {/* The full URL is already constructed in videoSrc, so no need to prepend localhost */}
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Video not found.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
