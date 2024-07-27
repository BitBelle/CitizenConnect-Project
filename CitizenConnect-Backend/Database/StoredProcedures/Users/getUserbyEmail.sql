GO

CREATE OR ALTER PROCEDURE getUserbyEmail(
    @userEmail VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Users 
    WHERE userEmail = @userEmail
END
