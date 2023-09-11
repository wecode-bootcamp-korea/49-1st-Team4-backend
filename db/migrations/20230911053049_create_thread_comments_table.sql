-- migrate:up
CREATE TABLE thread_comments(
        id INT NOT NULL AUTO_INCREMENT,
        thread_id INT NOT NULL,
        user_id INT NOT NULL,
        content VARCHAR(3000) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (thread_id) REFERENCES threads(id)
);
-- migrate:down
DROP TABLE threads;