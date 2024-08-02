

CREATE TABLE PasswordResets (
    pId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    resetToken VARCHAR(255) NOT NULL,
    expiresAt DATETIME NOT NULL,
    createdAt DATETIME DEFAULT GETDATE() NOT NULL,
    isEmailSent INT DEFAULT 0,

 FOREIGN KEY (userId) REFERENCES Users(userId));

DROP TABLE PasswordResets