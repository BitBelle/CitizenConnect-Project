CREATE PROCEDURE getGovernmentOfficialRequest
AS
BEGIN
    SELECT
        u.userId,
        u.userName,
        u.roleName,

    FROM
        Users u
    JOIN
        Requests r ON u.userId = r.userId
    WHERE
        u.roleName = 'Gov-Official' AND r.isApproved = 0;
END
