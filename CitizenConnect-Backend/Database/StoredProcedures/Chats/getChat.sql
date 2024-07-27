GO

CREATE OR ALTER PROCEDURE getChat(
    @chatsId VARCHAR(255),
    @userId VARCHAR(255),
    @userMessage VARCHAR(255)
)

AS
BEGIN
    SELECT * FROM Chats 
    WHERE chatsId = @chatsId
END
