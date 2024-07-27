GO
CREATE OR ALTER PROCEDURE deleteResetToken(
    @resetToken VARCHAR(255)
)
AS
BEGIN
    UPDATE Users 
    SET resetToken = NULL, resetTokenExpiry = NULL 
    WHERE resetToken = @resetToken
END
GO
