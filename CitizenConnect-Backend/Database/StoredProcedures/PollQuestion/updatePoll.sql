
GO

CREATE OR ALTER PROCEDURE updatePoll(
    @pollQuestionId VARCHAR(255), 
    @userId VARCHAR(255),
    @pollQuestion VARCHAR(255), 
    @pollStatus VARCHAR(255)
)
AS
BEGIN
    UPDATE PollQuestion
    SET
        pollQuestion = @pollQuestion,
        pollStatus = @pollStatus
    WHERE 
        pollQuestionId = @pollQuestionId
END
