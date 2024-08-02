USE CitizenConnect360

CREATE TABLE PollQuestion(
    pollQuestionId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) ,
    pollQuestion VARCHAR(255) ,
    pollStatus VARCHAR(255),
    isDeleted INT DEFAULT 0,

    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

DROP TABLE PollQuestion;