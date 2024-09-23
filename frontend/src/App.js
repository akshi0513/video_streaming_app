import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Auth from './components/Auth';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import CommentSection from './components/CommentSection';
import Navbar from './components/Navbar'; 

const VideoDetail = () => {
  const { id } = useParams(); // Use the hook inside the component

  return (
    <>
      <VideoPlayer />
      <CommentSection videoId={id} />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar /> {/* Include the Navbar component */}
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/upload" element={<VideoUpload />} />
            <Route path="/" element={<VideoList />} />
            <Route path="/videos/:id" element={<VideoDetail />} /> {/* Route with VideoDetail */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
