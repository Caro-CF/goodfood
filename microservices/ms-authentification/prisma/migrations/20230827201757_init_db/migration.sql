BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] VARCHAR(50) NOT NULL,
    [firstname] VARCHAR(50) NOT NULL,
    [phone_number] VARCHAR(10) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [User_active_df] DEFAULT 1,
    [password] VARCHAR(255) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [id_role] INT CONSTRAINT [User_id_role_df] DEFAULT 1,
    [id_restaurant] INT,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Address] (
    [id] INT NOT NULL IDENTITY(1,1),
    [street] VARCHAR(255) NOT NULL,
    [city] VARCHAR(50) NOT NULL,
    [zip_code] VARCHAR(5) NOT NULL,
    [country] VARCHAR(50) NOT NULL,
    [additional_informations] VARCHAR(255) NOT NULL,
    [id_user] INT NOT NULL,
    CONSTRAINT [Address_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Address_id_user_key] UNIQUE NONCLUSTERED ([id_user])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Role_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Permission_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[RolePermission] (
    [id_role] INT NOT NULL,
    [id_permission] INT NOT NULL,
    CONSTRAINT [RolePermission_pkey] PRIMARY KEY CLUSTERED ([id_role],[id_permission])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_id_role_fkey] FOREIGN KEY ([id_role]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Address] ADD CONSTRAINT [Address_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_id_role_fkey] FOREIGN KEY ([id_role]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_id_permission_fkey] FOREIGN KEY ([id_permission]) REFERENCES [dbo].[Permission]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
