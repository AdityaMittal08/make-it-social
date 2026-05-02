const pool = require("../../config/db");
const AppError = require("../../utils/AppError");

const toggleReaction = async (postId, userId, reactionType) => {
  const type = reactionType.toLowerCase();
  
  const client = await pool.connect(); 
  let action = '';

  try {
    await client.query('BEGIN'); 

    const existingReaction = await client.query(
      "SELECT reaction_type FROM reactions WHERE user_id = $1 AND post_id = $2",
      [userId, postId],
    );

    const existingType = existingReaction.rows[0]?.reaction_type;

    if (existingType === type) {
      await client.query(
        "DELETE FROM reactions WHERE user_id = $1 AND post_id = $2",
        [userId, postId],
      );

      const columnToDecrement = type === "like" ? "likes_count" : "dislike_count";
      await client.query(
        `UPDATE posts SET ${columnToDecrement} = ${columnToDecrement} - 1 WHERE post_id = $1`,
        [postId],
      );
      action = 'removed';
      
    } else if (existingType) {
      await client.query(
        "UPDATE reactions SET reaction_type = $1 WHERE user_id = $2 AND post_id = $3",
        [type, userId, postId],
      );

      if (type === "like") {
        await client.query(
          "UPDATE posts SET likes_count = likes_count + 1, dislike_count = dislike_count - 1 WHERE post_id = $1",
          [postId],
        );
      } else {
        await client.query(
          "UPDATE posts SET likes_count = likes_count - 1, dislike_count = dislike_count + 1 WHERE post_id = $1",
          [postId],
        );
      }
      action = 'updated';
      
    } else {
      await client.query(
        "INSERT INTO reactions (user_id, post_id, reaction_type) VALUES ($1, $2, $3)",
        [userId, postId, type],
      );

      const columnToIncrement = type === "like" ? "likes_count" : "dislike_count";
      await client.query(
        `UPDATE posts SET ${columnToIncrement} = ${columnToIncrement} + 1 WHERE post_id = $1`,
        [postId],
      );
      action = 'added';
    }

    await client.query('COMMIT'); 
    return { action, type };

  } catch (error) {
    await client.query('ROLLBACK'); 
    throw error; 
  } finally {
    client.release(); 
  }
};

module.exports = {
  toggleReaction,
};
