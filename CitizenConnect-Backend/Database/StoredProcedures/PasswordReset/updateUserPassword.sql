GO

CREATE OR ALTER PROCEDURE updateUserPassword(
    @userId VARCHAR(255), 
    @upassword VARCHAR(255)
)
AS
BEGIN
    UPDATE Users 
    SET
        upassword = @upassword
    WHERE 
        userId = @userId
END
