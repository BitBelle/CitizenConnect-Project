
GO

CREATE OR ALTER PROCEDURE updateIncident(
    -- @userId VARCHAR(255),
    @incidentId VARCHAR(255), 
    @incidentImg VARCHAR(255),
    @incidentDesc VARCHAR(255)
)

AS
BEGIN
    UPDATE Incident 
    SET
        
        incidentImg = @incidentImg,
        incidentDesc = @incidentDesc
    WHERE 
        incidentId = @incidentId
END
