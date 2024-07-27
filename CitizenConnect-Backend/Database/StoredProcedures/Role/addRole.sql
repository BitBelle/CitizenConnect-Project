

CREATE OR ALTER PROCEDURE addRole(
    @roleName VARCHAR(255),
    @roleId VARCHAR(255)
)

AS
BEGIN

    INSERT INTO Roles(roleName, roleId)
    VALUES(@roleName, @roleId)

END