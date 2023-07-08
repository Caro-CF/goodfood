USE master
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'delivery')
        DROP DATABASE delivery
GO

-- Création de la base de données delivery
CREATE DATABASE delivery
GO

USE delivery
GO

-- Table StatusDelivery
CREATE TABLE StatusDelivery(
    id INT NOT NULL IDENTITY(1,1),
    libelle VARCHAR(50)
    CONSTRAINT PK_StatusDelivery PRIMARY KEY (id)
)
GO

-- Table Delivery
CREATE TABLE Delivery(
    id INT NOT NULL IDENTITY(1,1),
    id_order INT NOT NULL,
    id_status INT NOT NULL,
    photo text
    CONSTRAINT PK_Delivery PRIMARY KEY (id),
    CONSTRAINT FK_Delivery_StatusDelivery FOREIGN KEY (id_status)
    REFERENCES StatusDelivery (id)
)
GO