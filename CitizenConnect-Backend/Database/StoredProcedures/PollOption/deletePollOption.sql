CREATE OR ALTER PROCEDURE deletePollOption (
    @optionId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM PollOptions
    WHERE optionId = @optionId;
END;
