const express = require("express");

const threadRouter = express.Router();
const { threadController } = require("../controllers");
const { validateToken } = require("../middleware/auth"); // 위에서 만든 미들웨어 로직을 임포트 합니다.

// threadRouter.use(validateToken);

threadRouter.get("/", threadController.getThreads);
//아래 post put delte는 권한 확인이 필요하다
threadRouter.post("/", validateToken, threadController.createThread);
threadRouter.put("/", validateToken, threadController.updateThread);
threadRouter.delete("/:id", validateToken, threadController.deleteThread);
threadRouter.get("/:id", validateToken, threadController.getThreadById);

module.exports = { threadRouter };
