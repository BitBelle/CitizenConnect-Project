
GO

CREATE OR ALTER PROCEDURE updateView(
    @viewId VARCHAR(255), 
    @viewContent VARCHAR(255)
)
AS
BEGIN
    UPDATE Views 
    SET
        viewContent = @viewContent
    WHERE 
        viewId = @viewId
END
