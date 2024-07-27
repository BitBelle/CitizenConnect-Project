GO

CREATE OR ALTER PROCEDURE getUser(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Users 
    WHERE userId = @userId
END
