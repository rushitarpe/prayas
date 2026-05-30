import User from '../models/user.model.js';
import Task from '../models/task.model.js';
import Post from '../models/post.model.js';

export const getPublicStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCompletedTasks = await Task.countDocuments({ status: 'completed' });
    const totalTasks = await Task.countDocuments();
    const totalPosts = await Post.countDocuments();

    const successRate = totalTasks > 0
      ? Math.round((totalCompletedTasks / totalTasks) * 100)
      : 0;

    res.status(200).json({
      totalUsers,
      totalCompletedTasks,
      totalTasks,
      totalPosts,
      successRate
    });
  } catch (error) {
    next(error);
  }
};
