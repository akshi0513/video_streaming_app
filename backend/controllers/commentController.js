const Comment = require('../models/Comment');

// Add a comment to a video
exports.addComment = async (req, res) => {
  const { videoId, comment } = req.body;

  try {
    const newComment = new Comment({
      videoId,
      userId: req.user.id, // Assume the user is authenticated
      comment,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding comment' });
  }
};

// Like a comment
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.likes += 1;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error liking comment' });
  }
};

// Dislike a comment
exports.dislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.dislikes += 1;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error disliking comment' });
  }
};

// Get comments for a video
exports.getComments = async (req, res) => {
  const { videoId } = req.query; // Ensure you're passing the videoId as a query parameter

  try {
    const comments = await Comment.find({ videoId });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};
