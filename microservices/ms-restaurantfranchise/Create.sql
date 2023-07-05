USE master
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'restaurant_franchise')
      DROP DATABASE restaurant_franchise
GO

-- Création de la base de données restaurant_franchise
CREATE database restaurant_franchise
GO

USE restaurant_franchise
GO

--CREATE USER Client WITH PASSWORD = 'Client@GoodFood2024'

-- Table Franchise
CREATE TABLE Franchise(
    id INT NOT NULL IDENTITY(1,1),
    name varchar(255)
    CONSTRAINT PK_Franchise PRIMARY KEY (id)
)
GO

-- Table Restaurant
CREATE TABLE Restaurant(
    id INT NOT NULL IDENTITY(1,1),
    id_franchise INT NOT NULL,
    name VARCHAR(255),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    address3 VARCHAR(255),
    city VARCHAR(255),
    postal_code CHAR(5),
    country VARCHAR(255),
    additional_details VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
    CONSTRAINT PK_Restaurant PRIMARY KEY (id),
    CONSTRAINT FK_Restaurant_Franchise FOREIGN KEY (id_franchise) 
    REFERENCES Franchise (id)   
)
GO

-- Table Tag
CREATE TABLE Tag(
    id INT NOT NULL IDENTITY(1,1),
    libelle VARCHAR(255)
    CONSTRAINT PK_Tag PRIMARY KEY (id)
)
GO

-- Table RestaurantTag
CREATE TABLE RestaurantTag(
    id_tag INT NOT NULL,
    id_restaurant INT NOT NULL
    CONSTRAINT PK_RestaurantTag PRIMARY KEY (id_tag, id_restaurant),
    CONSTRAINT FK_RestaurantTag_Tag FOREIGN KEY (id_tag) REFERENCES Tag (id),
    CONSTRAINT FK_RestaurantTag_Restaurant FOREIGN KEY (id_restaurant) REFERENCES Restaurant (id)
)
GO