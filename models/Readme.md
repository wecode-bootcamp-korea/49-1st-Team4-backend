## SQL문 참고사항

### getThreadById
threadId와 reqUserId를 인수로 받습니다.
threadId는 클릭한 스레드의 id이고, reqUserId는 해당 스레드를 요청한 user의 id입니다.

```SQL
/*
threadId와 reqUserId를 이용하여 하나의 쓰레드 정보를 불러오는 SQL문
테이블을 구성한 후 마지막 WHERE문으로 하나의 스레드만 불러옴 (성능 향상을 위한 의견 있으시면 알려주세요)
*/
SELECT 
# 필요한 컬럼들을 원하는 컬럼명으로 불러옴
threads.id AS postId, 
users.nickname,
users.profile_image AS profileImage,
# 불러온 스레드의 user_id가 요청한 유저의 id(reqUserId)와 같으면 요청한 유저가 작성한 스레드로 판단하여 true 반환, 나머지 경우 false
EXISTS (SELECT user_id FROM threads WHERE id = ${reqUserId}) AS isMyPost,
threads.content,
# threadId에 해당하는 스레드의 좋아요 중에 요청한 유저의 id가 있으면 true로 반환
EXISTS (SELECT id FROM thread_like WHERE user_id = ${reqUserId} AND thread_id = ${threadId}) AS isLiked,
# threadId로 thread_like 테이블을 검색하여 갯수를 likeCount의 이름으로 반환
(SELECT COUNT(*) FROM thread_like WHERE thread_id = ${threadId}) AS likeCount,
# 해당 포스트의 comments를 json array로 모아서 comments 컬럼에 주입
(
    SELECT
    JSON_ARRAYAGG(
        JSON_OBJECT(
        "commentId", thread_comments.id,
        "nickname", commenter.nickname,
        "comment", thread_comments.content,
        # 요청한 유저의 아이디와 comment 작성한 유저의 아이디가 같으면 true 반환
        "isMyReply", IF (thread_comments.user_id = ${reqUserId}, TRUE, FALSE), 
        "createdAt", thread_comments.created_at
        )
    ) FROM thread_comments
    # threa_comments의 user_id를 기준으로 thread_comments 테이블에 users 테이블을 commenter 라는 이름으로 붙임
    LEFT JOIN users commenter ON thread_comments.user_id = commenter.id
    # 선택한 thread_id로 필터
    WHERE thread_id = ${threadId}
    # thread_id를 기준으로 묶음
    GROUP BY thread_id
) AS comments, # 묶은 comment들을 comments라는 이름으로 내보냄
threads.created_at AS createdAt
FROM threads
# thread 작성한 user의 nickname과 profileImage를 내보내기 위해 users table을 join
LEFT JOIN users ON threads.user_id = users.id
# 지정된 thread_id로 필터
WHERE threads.id = ${threadId};
```

### getAllThreads

userId 인자를 받습니다.
undefined인 경우와 값이 있는 경우로 구분되어 처리합니다.

```SQL
# 기존에 작성된 procedure가 있으면 drop 합니다.
DROP PROCEDURE IF EXISTS query_threads;
```

```SQL
# SQL 내에서 사용되는 procedure (함수와 유사)를 query_threads라는 이름으로 작성합니다.
CREATE PROCEDURE query_threads()
# 위에서 정의한 procedure 작성을 시작합니다.
BEGIN
    # input_user_id라는 이름의 변수를 기본값 0으로 하여 생성합니다.
    DECLARE input_user_id INTEGER DEFAULT 0;
    # getAllThreads 함수에 userId가 입력되는 경우 input_usr_id값을 지정하는 쿼리문을 추가합니다.
    ${setUserIdVariable}
    # input_user_id값을 지정하는 경우 아래의 쿼리문이 ${setUserIdVariable} 자리에 추가됩니다. 그렇지 않은 경우 쿼리문이 추가되지 않습니다.
    SET input_user_id = ${userId};
    # SELECT 쿼리를 시작합니다.
    SELECT
    threads.id AS postId,
    users.nickname,
    users.profile_image AS profileImage,
    # 조회된 스레드들 중에 요청을 보낸 유저가 작성한 글을 찾아서 isMyPost의 boolean 값으로 반환합니다.
    # input_user_id값이 기본값 그대로인 경우(로그인하지 않고 요청한 경우) 모든 값에 false를 반환합니다. 실제로는 0이 입력됩니다.
    # input_user_id가 입력된 경우, 해당 값이 스레드의 user_id와 동일하면 true를 반환합니다.
    IF (input_user_id = 0, false, IF (threads.user_id = input_user_id, true, false)) AS isMyPost,
    threads.content,
    # 요청을 보낸 유저가 좋아요를 누른 값인지 반환합니다. 자세한 로직은 아래 join문에서 구현됩니다.
    is_liked_table.is_liked,
    # 해당 스레드의 좋아요 갯수를 반환합니다. 자세한 로직은 아래 join문에서 구현됩니다.
    like_counts.counts AS likeCount,
    threads.created_at AS createdAt,
    # comments를 묶어서 반환합니다. 자세한 로직은 아래 join문에서 구현됩니다.
    comments.comments
    FROM threads
    # 스레드의 작성자 정보를 join으로 얻어옵니다.
    LEFT JOIN users ON threads.user_id = users.id
    # 스레드의 comments 를 json array로 얻어오는 테이블입니다.
    LEFT JOIN (
        SELECT
        # 서브쿼리 테이블을 threads 테이블과 join할 때 on key로 사용되는 thread_id입니다.
        thread_comments.thread_id,
        # comments라는 이름으로 각 스레드에 달린 comment를 묶어줍니다.
        # 여러개의 데이터를 json array로 묶어줍니다.
        JSON_ARRAYAGG(
            # 조회된 데이터를 json object로 묶어줍니다. 아래의 구성대로 json object가 만들어집니다.
            JSON_OBJECT(
                "commentId", thread_comments.id,
                "nickname", commenter.nickname,
                "comment", thread_comments.content,
                "createdAt", thread_comments.created_at,
                # 요청자가 작성한 댓글인지 boolean을 반환합니다.
                # 조회한 댓글의 작성자 id가 요청을 보낸 user의 id와 같으면 true를 반환합니다.
                "isMyReply", IF (commenter.id = input_user_id, true, false)
            )
        ) AS comments # 이상의 json array를 comments란 컬럼으로 내보냅니다.
        # thread_comments table에서 시작합니다.
        FROM thread_comments
        # comment의 작성자를 연결하기 위해 users table을 commenter라는 이름으로 join 합니다.
        LEFT JOIN users commenter ON thread_comments.user_id = commenter.id
        # thread_id 별로 쿼리 결과를 묶어줍니다. 이 구문을 통해 json array가 구성됩니다.
        GROUP BY thread_id
    # comments를 모은 테이블을 thread_id를 기준으로 threads 테이블과 join 합니다.
    ) comments ON threads.id = comments.thread_id
    # isLiked 값을 구하기 위한 join입니다.
    LEFT JOIN (
        # isLiked 값을 얻기 위해 서브쿼리로 테이블을 구성합니다.
        SELECT
        thread_like.thread_id,
        # thread에 달린 좋아요 개수를 합하여 반환합니다.
        COUNT(thread_like.user_id) AS is_liked
        FROM thread_like 
        # 스레드에 달린 좋아요들을 요청을 보낸 유저의 id로 필터합니다. 
        # 이 과정으로 요청한 유저가 좋아요를 누른 스레드에만 1이 들어가고 나머지는 0이 들어갑니다.
        WHERE thread_like.user_id = input_user_id
        # thread id로 묶어줍니다.
        GROUP BY thread_like.thread_id
    # 결과 테이블을 is_liked_table로 반환합니다.
    ) is_liked_table ON threads.id = is_liked_table.thread_id
    # 좋아요 개수를 구해서 join해줍니다.
    LEFT JOIN (
        # 서브쿼리로 좋아요 개수를 갖는 테이블을 작성합니다.
        SELECT
        thread_like.thread_id,
        # user_id의 갯수를 count해서 counts란 이름의 컬럼에 넣습니다.
        COUNT(thread_like.user_id) AS counts
        FROM thread_like 
        # thread_id를 기준으로 지정합니다. 위의 count가 thread_id를 기준으로 합쳐집니다.
        GROUP BY thread_like.thread_id
    # 이상의 테이블을 like_counts라는 테이블로 내보내고, threads 테이블에 thread_id를 기준으로 join합니다.
    ) like_counts ON threads.id = like_counts.thread_id
    # 전체 결과를 threads 테이블의 created_at을 기준으로 정렬합니다. 최신순으로 정렬합니다.
    ORDER BY threads.created_at DESC;
# procedure 작성의 마지막입니다.
END;
```

```SQL 
# 위에서 작성한 procedure를 호출합니다.
CALL query_threads();
```