import { useState, useEffect } from 'react';
import { addComment, likeComment, dislikeComment, getComments } from '../api';
import './CommentSection.css'; // Import the CSS file

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(videoId);
      setComments(response.data);
    };

    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const response = await addComment(videoId, newComment);
    setComments([...comments, response.data]);
    setNewComment('');
  };

  const handleLike = async (commentId) => {
    await likeComment(commentId);
    const updatedComments = comments.map((comment) =>
      comment._id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    );
    setComments(updatedComments);
  };

  const handleDislike = async (commentId) => {
    await dislikeComment(commentId);
    const updatedComments = comments.map((comment) =>
      comment._id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
    );
    setComments(updatedComments);
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.comment}</p>
            <div className="likes-dislikes">
              <span>{comment.likes} Likes</span>
              <button onClick={() => handleLike(comment._id)}>Like</button>
              <span>{comment.dislikes} Dislikes</span>
              <button onClick={() => handleDislike(comment._id)}>Dislike</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </div>
  );
};

export default Comments;
