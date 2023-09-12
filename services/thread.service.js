const { AppDataSource } = require("../models/data-source");
const threadDao = require("../models/threads.dao");
const { throwError } = require("../utils/throwError");
const { checkEmptyValues } = require("../utils/checkEmptyValues");

const threadCheck = async (req, res) => {
  //DB 소스 변수를 가져오고
  const { user_id, content } = req.body;
  const treads = await threadDao.getAllThreads();
  //if user_id = 0, SELECT * FROM posts
  if (threads == 0) {
    throwError(400, "NO_CONTENT");
  } else {
    const postData = await myDataSource.query(`
        SELECT users.name, posts.title, posts.content, posts.created_at 
        FROM posts 
        INNER JOIN users ON users.id = posts.user_id
        WHERE users.name LIKE '${user_name}';
        `);
  }
  //예외 처리 checkpost
  checkpost();
  //프론트에 전달
};
