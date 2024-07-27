
CREATE TABLE PDF_Documents(
    documentsId VARCHAR(255) PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(255) NOT NULL,
    upload DATETIME DEFAULT GETDATE(),   
    isDeleted INT DEFAULT 0,


    FOREIGN KEY (userId) REFERENCES Users (userId)
);


SELECT * FROM Views

DROP TABLE PDF_Documents