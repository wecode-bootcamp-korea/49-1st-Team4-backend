const { throwError } = require("../utils/throwError");
const { UserService } = require("../services/user.service");
const jwt = require("jsonwebtoken");

const { AUTH_TOKEN_SALT } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = jwt.verify(token, AUTH_TOKEN_SALT); // 암호화된 토큰을 복호화 합니다.

    const foundUser = await UserService.findUser(id);

    if (!foundUser) {
      // 이 토큰을 가진 유저가 데이터베이스에 없으면 404 에러를 냅니다.
      throwError(404, "USER_NOT_FOUND");
    }
    req.body.user_id = id; // request 객체에 새로운 키값에 찾아진 유저의 정보를 할당하고
    next(); // next() 함수로 다음 미들웨어로 맥락(context)를 연결합니다.
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };
