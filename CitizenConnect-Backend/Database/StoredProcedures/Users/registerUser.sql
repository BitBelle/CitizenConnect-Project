

GO

CREATE OR ALTER PROCEDURE registerUser( 
    @userId VARCHAR(255),
    -- @userImg VARCHAR(255),
    @userName VARCHAR(255),
    @userEmail VARCHAR(255),
    @roleName VARCHAR(255),
    @upassword VARCHAR(255),
    @termsAccepted INT,
    @isApproved INT
)

AS 
BEGIN


INSERT INTO Users( userId, userName, userEmail, roleName, upassword, termsAccepted, isApproved)
VALUES(  @userId,  @userName, @userEmail, @roleName, @upassword, @termsAccepted, @isApproved)

END