
CREATE TABLE Roles(
    roleName VARCHAR(255) PRIMARY KEY,
    roleId VARCHAR(255) NOT NULL,
);


INSERT INTO Roles (roleId, roleName)
VALUES 
        ('1', 'Admin'),
        ('2', 'Gov-Official'),
        ('3', 'Citizen')

SELECT * FROM Roles;

DROP TABLE Roles