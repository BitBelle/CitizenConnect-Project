GO

CREATE OR ALTER PROCEDURE approveUser(
    @userId VARCHAR(255)
)
AS
BEGIN
    UPDATE Users
    SET isApproved = 1
    WHERE userId = @userId;
END

GO
