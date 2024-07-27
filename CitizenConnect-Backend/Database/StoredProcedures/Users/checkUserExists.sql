CREATE OR ALTER PROCEDURE checkUserExists(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT 1 FROM Users WHERE userId = @userId
END
