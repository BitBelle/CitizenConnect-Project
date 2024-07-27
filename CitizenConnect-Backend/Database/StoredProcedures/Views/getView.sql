GO

CREATE OR ALTER PROCEDURE getView(
    @viewId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Views 
    WHERE viewId = @viewId
END
