-- migrate:up
ALTER TABLE threads DROP FOREIGN KEY threads_ibfk_1;

ALTER TABLE threads
ADD FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE CASCADE;

ALTER TABLE thread_like DROP FOREIGN KEY thread_like_ibfk_1;

ALTER TABLE thread_like
ADD FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE CASCADE;

ALTER TABLE thread_like DROP FOREIGN KEY thread_like_ibfk_2;

ALTER TABLE thread_like
ADD FOREIGN KEY (thread_id)
REFERENCES threads (id)
ON DELETE CASCADE;

ALTER TABLE thread_comments DROP FOREIGN KEY thread_comments_ibfk_1;

ALTER TABLE thread_comments
ADD FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE CASCADE;
ALTER TABLE thread_comments DROP FOREIGN KEY thread_comments_ibfk_2;

ALTER TABLE thread_comments
ADD FOREIGN KEY (thread_id)
REFERENCES threads (id)
ON DELETE CASCADE;

-- migrate:down

