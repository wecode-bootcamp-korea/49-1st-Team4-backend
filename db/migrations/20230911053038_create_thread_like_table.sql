-- migrate:up
CREATE TABLE thread_like(
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        thread_id INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (thread_id) REFERENCES threads(id)
);
-- migrate:down
DROP TABLE threads;