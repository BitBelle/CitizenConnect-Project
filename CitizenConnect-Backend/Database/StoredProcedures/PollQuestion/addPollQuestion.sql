CREATE OR ALTER PROCEDURE addPollQuestion(
    @pollQuestionId VARCHAR(255),
    @userId VARCHAR(255),
    @pollQuestion VARCHAR(255),
    @pollStatus VARCHAR(255)
)
AS
BEGIN
    INSERT INTO PollQuestion (pollQuestionId, userId, pollQuestion, pollStatus)
    VALUES (@pollQuestionId, @userId, @pollQuestion, @pollStatus)
END
