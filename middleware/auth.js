const { UserService } = require("../services/user.service");
const jwt = require("jsonwebtoken");

const { AUTH_TOKEN_SALT } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = jwt.verify(token, AUTH_TOKEN_SALT); // 암호화된 토큰을 복호화 합니다.

    await UserService.findUser(id);

    req.body.user_id = id; // request 객체에 새로운 키값에 찾아진 유저의 정보를 할당하고
    next(); // next() 함수로 다음 미들웨어로 맥락(context)를 연결합니다.
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };
