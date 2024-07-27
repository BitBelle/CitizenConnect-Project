GO
CREATE OR ALTER PROCEDURE getResetRecord(
    @resetToken VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Users WHERE resetToken = @resetToken
END
GO
