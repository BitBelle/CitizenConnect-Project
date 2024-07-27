

GO

CREATE OR ALTER PROCEDURE deleteChat (
    @chatsId VARCHAR(255)
  
)
AS
BEGIN
    --soft delete by setting isDeleted to 1
    UPDATE Chats
    SET isDeleted = 1
    WHERE chatsId = @chatsId;
END
