CREATE TABLE PollOptions(
    optionId VARCHAR(255) PRIMARY KEY,
    pollQuestionId VARCHAR(255) NOT NULL,
    optionText VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0
    
    FOREIGN KEY (pollQuestionId) REFERENCES PollQuestion(pollQuestionId) ON DELETE CASCADE
);

DROP TABLE PollOptions