USE CitizenConnect360

CREATE TABLE PollQuestion(
    pollQuestionId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    pollQuestion VARCHAR(255) NOT NULL,
    pollStatus VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,

    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

DROP TABLE PollQuestion;