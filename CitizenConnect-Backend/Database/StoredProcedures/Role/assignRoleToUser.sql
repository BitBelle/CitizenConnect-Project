
CREATE PROCEDURE AssignRoleToUser
    @userId VARCHAR(255),
    @roleName VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET roleName = @roleName
    WHERE userId = @userId
END;
