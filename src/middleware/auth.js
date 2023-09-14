const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const { throwError } = require("../utils/throwError");

const { SECRET } = process.env;

const validateToken = async (req, res, next) => {
  try {
    // GET에 토큰 없고, threadId 없을때 -> 그냥 next()
    const token = req.headers.authorization;
    if ((req.method = "GET" && !token && !req.params.threadId)) {
      next();
    } else {
      // method가 GET이 아닌 모든 것, token은 있을수도, 없을수도
      // token 없으면
      if (!token) {
        throwError(401, "UNAUTHORIZED");
      }
      let userId;
      try {
        const decoded = jwt.verify(token, SECRET); // 암호화된 토큰을 복호화 합니다.
        userId = decoded.id;
      } catch (error) {
        // verify에서 에러가 나거나, findUser에서 에러가 나면
        throwError(400, "INVALID_TOKEN");
      }
      await userService.findUser(userId);
      req.userId = userId; // request 객체에 새로운 키값에 찾아진 유저의 정보를 할당하고
      next(); // next() 함수로 다음 미들웨어로 맥락(context)를 연결합니다.
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };
