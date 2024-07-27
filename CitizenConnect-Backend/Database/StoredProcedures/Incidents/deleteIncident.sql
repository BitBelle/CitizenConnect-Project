

GO

CREATE OR ALTER PROCEDURE deleteIncident (
    @incidentId VARCHAR(255)
  
)
AS
BEGIN
    --soft delete by setting isDeleted to 1
    UPDATE Incident
    SET isDeleted = 1
    WHERE incidentId = @incidentId;
END
