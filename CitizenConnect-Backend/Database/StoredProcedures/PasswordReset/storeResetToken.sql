GO
CREATE OR ALTER PROCEDURE storeResetToken(
    @userEmail VARCHAR(255),
    @resetToken VARCHAR(255),
    @resetTokenExpiry DATETIME
)
AS
BEGIN
    UPDATE Users 
    SET resetToken = @resetToken, resetTokenExpiry = @resetTokenExpiry 
    WHERE userEmail = @userEmail
END
GO
