

CREATE OR ALTER PROCEDURE addChat(
    @chatsId VARCHAR(255),
    @userId VARCHAR(255),
    @userMessage VARCHAR(255)
)

AS
BEGIN

    INSERT INTO Chats(chatsId, userId, userMessage)
    VALUES(@chatsId, @userId, @userMessage)

END