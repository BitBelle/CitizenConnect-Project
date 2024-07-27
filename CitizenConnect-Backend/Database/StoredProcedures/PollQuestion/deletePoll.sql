CREATE OR ALTER PROCEDURE deletePoll (
    @pollQuestionId VARCHAR(255)
)
AS
BEGIN
    -- Soft delete poll question
    UPDATE PollQuestion
    SET isDeleted = 1
    WHERE pollQuestionId = @pollQuestionId;

    -- Soft delete poll options
    UPDATE PollOptions
    SET isDeleted = 1
    WHERE pollQuestionId = @pollQuestionId;
END;
