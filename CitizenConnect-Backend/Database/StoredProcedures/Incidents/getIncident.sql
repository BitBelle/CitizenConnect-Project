GO

CREATE OR ALTER PROCEDURE getIncident(
    @incidentId VARCHAR(255)
)

AS
BEGIN
    SELECT * FROM Incident 
    WHERE incidentId = @incidentId
END
