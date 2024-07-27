GO

CREATE OR ALTER PROCEDURE getPoll(
    @pollQuestionId VARCHAR(255),
    @userId VARCHAR(255),
    @pollQuestion VARCHAR(255),
    @pollStatus VARCHAR(255)
)

AS
BEGIN
    SELECT * FROM PollQuestion
    WHERE pollQuestionId = @pollQuestionId
END
