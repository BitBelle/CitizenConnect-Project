GO

CREATE OR ALTER PROCEDURE getDeletedUsers

AS
BEGIN
    SELECT * FROM Users 
    WHERE isDeleted = 1
END


EXEC getDeletedUsers;
