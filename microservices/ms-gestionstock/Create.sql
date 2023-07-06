USE master
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'gestion_stock')
      DROP DATABASE gestion_stock
GO

-- Création de la base de données gestion_stock
CREATE database gestion_stock
GO

USE gestion_stock
GO

-- Table Stock
CREATE TABLE Stock(
    id_restaurant INT NOT NULL,
    id_ingredient INT NOT NULL,
    value INT NOT NULL,
    CONSTRAINT PK_Stock PRIMARY KEY (id_restaurant, id_ingredient)
)
GO