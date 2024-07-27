

GO

CREATE OR ALTER PROCEDURE deleteView (
    @viewId VARCHAR(255)
  
)
AS
BEGIN
    --soft delete by setting isDeleted to 1
    UPDATE Views
    SET isDeleted = 1
    WHERE userId = @userId;
END
