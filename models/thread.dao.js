const { AppDataSource } = require("../models/data-source");

const getAllThreads = async (userId) => {
  // userId 인풋에 따라서 추가 쿼리문을 설정합니다.
  // userId가 있으면 SQL 변수에 해당 값을 지정하는 쿼리문을 추가합니다.
  let setUserIdVariable = "";
  if (userId) {
    setUserIdVariable = `SET input_user_id = ${userId};`;
  }
  // drop created procedure if exists
  await AppDataSource.query(`
  DROP PROCEDURE IF EXISTS query_threads;
  `);
  // create query procedure
  await AppDataSource.query(`
  CREATE PROCEDURE query_threads()
  BEGIN
    DECLARE input_user_id INTEGER DEFAULT 0;
    ${setUserIdVariable}
    SELECT
      threads.id AS postId,
      users.nickname,
      users.profile_image AS profileImage,
      IF (
        input_user_id = 0, 
        false, 
        IF (
          threads.user_id = input_user_id, 
          true, 
          false
        )
      ) AS isMyPost,
      threads.content,
      is_liked_table.is_liked,
      like_counts.counts AS likeCount,
      threads.created_at AS createdAt,
      comments.comments
    FROM threads
    LEFT JOIN users ON threads.user_id = users.id
    LEFT JOIN (
      SELECT
      thread_comments.thread_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "commentId", thread_comments.id,
          "nickname", commenter.nickname,
          "comment", thread_comments.content,
          "createdAt", thread_comments.created_at,
          "isMyReply", IF (
            commenter.id = input_user_id, 
            true, 
            false
          )
        )
      ) AS comments
      FROM thread_comments
      LEFT JOIN users commenter ON thread_comments.user_id = commenter.id
      GROUP BY thread_id
    ) comments ON threads.id = comments.thread_id
    LEFT JOIN (
      SELECT
      thread_like.thread_id,
      COUNT(thread_like.user_id) AS is_liked
      FROM thread_like 
      WHERE thread_like.user_id = input_user_id
      GROUP BY thread_like.thread_id
    ) is_liked_table ON threads.id = is_liked_table.thread_id
    LEFT JOIN (
      SELECT
      thread_like.thread_id,
      COUNT(thread_like.user_id) AS counts
      FROM thread_like 
      GROUP BY thread_like.thread_id
    ) like_counts ON threads.id = like_counts.thread_id
    ORDER BY threads.created_at DESC;
  END;
  `);
  // call created query procedure
  const queryResult = await AppDataSource.query(`
  CALL query_threads();
  `);
  // queryResult = [(data), (header)]
  const threads = queryResult[0];
  return threads;
};

const createThread = async (tread) => {
  await AppDataSource.query(`
    INSERT INTO threads(
      user_id, 
      content
      )
    VALUES(
      '${tread.userId}',
      '${tread.content}'
    )
    `);
};

const getThreadById = async (threadId, reqUserId) => {
  const threads = await AppDataSource.query(`
  SELECT
  threads.id AS postId,
  users.nickname,
  users.profile_image AS profileImage,
  EXISTS (
    SELECT user_id 
    FROM threads 
    WHERE id = ${reqUserId}
  ) AS isMyPost,
  threads.content,
  EXISTS (
    SELECT id 
    FROM thread_like 
    WHERE user_id = ${reqUserId} AND thread_id = ${threadId}
  ) AS isLiked,
  (
    SELECT 
      COUNT(*) 
    FROM thread_like 
    WHERE thread_id = ${threadId}
  ) AS likeCount,
  (
    SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "commentId", thread_comments.id,
          "nickname", commenter.nickname,
          "comment", thread_comments.content,
          "isMyReply", IF (thread_comments.user_id = ${reqUserId}, TRUE, FALSE),
          "createdAt", thread_comments.created_at
        )
      ) 
    FROM thread_comments
    LEFT JOIN users commenter ON thread_comments.user_id = commenter.id
    WHERE thread_id = ${threadId}
    GROUP BY thread_id
  ) AS comments,
  threads.created_at AS createdAt
  FROM threads
  LEFT JOIN users ON threads.user_id = users.id
  WHERE threads.id = ${threadId};
  `);
  return threads;
};

const updateThread = async (threadId, content) => {
  await myDataSource.query(`
    UPDATE posts 
    SET content = '${content}' 
    WHERE id = '${threadId}';
  `);
};

const deleteThread = async (threadId) => {
  await myDataSource.query(`
      DELETE FROM posts 
      WHERE id = '${threadId}';
    `);
};

module.exports = {
  getAllThreads,
  createThread,
  getThreadById,
  getAllThreads,
  updateThread,
  deleteThread,
};

