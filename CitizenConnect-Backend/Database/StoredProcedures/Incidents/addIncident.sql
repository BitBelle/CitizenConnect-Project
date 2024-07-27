

CREATE OR ALTER PROCEDURE addIncident(
    @incidentId VARCHAR(255),
    @userId VARCHAR(255),
    @userName VARCHAR(255),
    @incidentImg VARCHAR(255),
    @incidentDesc VARCHAR(255)
)

AS
BEGIN

    INSERT INTO Incident(incidentId, userId, userName, incidentImg, incidentDesc)
    VALUES(@incidentId, @userId, @userName, @incidentImg, @incidentDesc)

END