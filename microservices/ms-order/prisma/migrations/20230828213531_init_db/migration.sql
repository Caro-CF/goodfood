BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_user] INT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [Order_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [id_status] INT NOT NULL,
    [address] NVARCHAR(100) NOT NULL,
    [city] NVARCHAR(50) NOT NULL,
    [zip_code] NVARCHAR(5) NOT NULL,
    [additional_informations] NVARCHAR(50),
    [id_delivery] INT,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StatusOrder] (
    [id] INT NOT NULL IDENTITY(1,1),
    [libelle] NVARCHAR(50) NOT NULL,
    CONSTRAINT [StatusOrder_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_id_status_fkey] FOREIGN KEY ([id_status]) REFERENCES [dbo].[StatusOrder]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
