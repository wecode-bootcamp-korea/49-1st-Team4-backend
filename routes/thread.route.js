const express = require("express");
const threadController = require("../controllers/thread.controller");
const threadRouter = express.Router();
const { validateToken } = require("../middleware/auth"); // 위에서 만든 미들웨어 로직을 임포트 합니다.

router.use(validateToken); // 전체적
app.use(validateToken);

threadRouter.get("/check", threadController.threadCheck);
//아래 post put delte는 권한 확인이 필요하다
threadRouter.post("/post", validateToken, threadController.threadPost);
threadRouter.put("/update", validateToken, threadController.threadUpdate);
threadRouter.delete("/delete", validateToken, threadController.threadDelete);
threadRouter.get("/:id", threadController.getThread);

module.exports = { threadRouter };
