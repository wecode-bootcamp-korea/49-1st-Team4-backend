const { AppDataSource } = require("../models/data-source");

const getThreadById = async (threadId, reqUserId) => {
  const threads = await AppDataSource.query(`
    SELECT
    threads.id AS postId,
    users.nickname,
    users.profile_image AS profileImage,
    EXISTS (SELECT user_id FROM threads WHERE id = ${reqUserId}) AS isMyPost,
    threads.content,
    EXISTS (SELECT id FROM thread_like WHERE user_id = ${reqUserId} AND thread_id = ${threadId}) AS isLiked,
    (SELECT COUNT(*) FROM thread_like WHERE thread_id = ${threadId}) AS likeCount,
    (
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
          "commentId", thread_comments.id,
          "nickname", commenter.nickname,
          "comment", thread_comments.content,
          "isMyReply", IF (thread_comments.user_id = 4, TRUE, FALSE),
          "createdAt", thread_comments.created_at
          )
        ) FROM thread_comments
      LEFT JOIN users commenter ON thread_comments.user_id = commenter.id
      LEFT JOIN threads ON threads.id = thread_comments.thread_id
      WHERE thread_id = 1
      GROUP BY thread_id
    ) AS comments,
    threads.created_at AS createdAt
    FROM threads
    LEFT JOIN users ON threads.user_id = users.id
    WHERE threads.id = ${threadId};
    `);
  return threads;
};

module.exports = {
  getThreadById,
};
