const express = require('express');
const { addComment, likeComment, dislikeComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for protected routes

const router = express.Router();

router.post('/comment', protect, addComment);
router.post('/comment/:id/like', protect, likeComment);
router.post('/comment/:id/dislike', protect, dislikeComment);
// Route to get comments for a video
router.get('/', getComments); 
module.exports = router;
