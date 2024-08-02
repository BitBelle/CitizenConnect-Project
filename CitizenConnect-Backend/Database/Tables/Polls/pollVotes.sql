
CREATE TABLE PollVotes(
    votesId VARCHAR(255) PRIMARY KEY,
    pollQuestionId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    optionId VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,

    
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (pollQuestionId) REFERENCES PollQuestion(pollQuestionId),
    FOREIGN KEY (optionId) REFERENCES PollOptions(optionId)

        
);

DROP TABLE PollVotes;

SELECT * FROM PollVotes