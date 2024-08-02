USE CitizenConnect360

CREATE TABLE Users (
    userId VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL UNIQUE,
    upassword VARCHAR(255) NOT NULL,
    roleName VARCHAR(255) NOT NULL,
    resetToken VARCHAR(255),
    resetTokenExpiry VARCHAR(255),
    isDeleted INT DEFAULT 0,
    isEmailSent INT DEFAULT 0,
    isResetEmailSent INT DEFAULT 0,
    termsAccepted INT DEFAULT 0,

    FOREIGN KEY (roleName) REFERENCES Roles(roleName),
);

DROP TABLE Users;

ALTER TABLE Users
ADD isApproved INT DEFAULT 0;

SELECT * FROM Users

DELETE FROM Users


SELECT * FROM dbo.Users WHERE userId = 'ee310da2-0611-400a-b557-af1102cdcd97';
