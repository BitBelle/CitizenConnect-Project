CREATE OR ALTER PROCEDURE addPollOption(
    @optionId VARCHAR(255),
    
    @pollQuestionId VARCHAR(255),
    @optionText VARCHAR(255)
)
AS
BEGIN
    INSERT INTO PollOptions (optionId, pollQuestionId, optionText)
    VALUES (@optionId, @pollQuestionId, @optionText)
END
