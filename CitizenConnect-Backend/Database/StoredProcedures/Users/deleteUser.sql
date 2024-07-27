

GO

CREATE OR ALTER PROCEDURE deleteUser (
    @userId VARCHAR(255)
  
)
AS
BEGIN
    --soft delete by setting isDeleted to 1
    UPDATE Users
    SET isDeleted = 1
    WHERE userId = @userId;
END
