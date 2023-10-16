--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-15
-- Description: Script to create the tables in the database
--------------------------------------------------------------------------

-- 0. ERROR LOGS

CREATE TABLE [dbo].[Errors]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),

    -- Other fields
    [username] VARCHAR(100) NULL,
    [errorNumber] INT NULL,
    [errorState] INT NULL,
    [errorSeverity] INT NULL,
    [errorLine] INT NULL,
    [errorProcedure] VARCHAR(MAX) NULL,
    [errorMessage] VARCHAR(MAX) NULL,
    [errorDatetime] DATETIME NOT NULL
);

-- 1. USERS

CREATE TABLE [dbo].[Users]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),

    -- Other fields
    [name] VARCHAR(32) NOT NULL,
    [lastName1] VARCHAR(32) NOT NULL,
    [lastName2] VARCHAR(32) NOT NULL,
    [email] VARCHAR(128) NOT NULL,
    [password] VARCHAR(64) NOT NULL,
    [token] VARCHAR(300) NOT NULL,
    [deleted] BIT NOT NULL
);

-- 2. GALLERY

CREATE TABLE [dbo].[ImageCategories]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [description] VARCHAR(32) NOT NULL,

    -- Other fields
    [deleted] BIT NOT NULL
);

CREATE TABLE [dbo].[ImageSubcategories]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [categoryId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[ImageCategories]([id]),
    [description] VARCHAR(32) NOT NULL,

    -- Other fields
    [deleted] BIT NOT NULL
);

CREATE TABLE [dbo].[Images]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [subcategoryId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[ImageSubcategories]([id]),
    
    -- Other fields
    [name] VARCHAR(128) NOT NULL,
    [description] VARCHAR(1024) NOT NULL,
    [date] DATETIME NOT NULL,
    [imageUrl] VARCHAR(256) NOT NULL,
    [deleted] BIT NOT NULL
);

CREATE TABLE [dbo].[Tags]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [imageId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Images]([id]),
    
    -- Other fields
    [description] VARCHAR(64) NOT NULL,
    [deleted] BIT NOT NULL
);

-- 3. STORE

CREATE TABLE [dbo].[ProductCategories]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [description] VARCHAR(32) NOT NULL,

    -- Other fields
    [deleted] BIT NOT NULL
);

CREATE TABLE [dbo].[Products]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [categoryId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[ProductCategories]([id]),

    -- Other fields
    [name] VARCHAR(128) NOT NULL,
    [description] VARCHAR(512) NOT NULL,
    [imageUrl] VARCHAR(256) NOT NULL,
    [price] MONEY NOT NULL,
    [weight] FLOAT NOT NULL,
    [available] BIT NOT NULL,
    [deleted] BIT NOT NULL
);

-- 4. Orders and shipping

CREATE TABLE [dbo].[ShippingFee]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),

    -- Other fields
    [type] VARCHAR(32) NOT NULL,
    [baseKgFee] MONEY NOT NULL,
    [extraKgFee] MONEY NOT NULL
);

CREATE TABLE [dbo].[Addresses]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),

    -- Other fields
    [province] VARCHAR(16) NOT NULL,
    [canton] VARCHAR(32) NOT NULL,
    [district] VARCHAR(32) NOT NULL,
    [specificAddress] VARCHAR(128) NOT NULL,
    [shippingFee] MONEY NOT NULL
);

CREATE TABLE [dbo].[OrderStatuses]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [description] VARCHAR(32) NOT NULL,

    -- Other fields
    [deleted] BIT NOT NULL
);

CREATE TABLE [dbo].[Orders]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [orderStatusId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[OrderStatuses]([id]),
    [userId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Users]([id]),
    [addressId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Addresses]([id]),

    -- Other fields
    [voucherImageUrl] VARCHAR(256) NOT NULL,
    [timestamp] DATETIME NOT NULL,
    [deleted] BIT NOT NULL
);

CREATE TABLE [dbo].[OrderProducts]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [orderId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Orders]([id]),
    [productId] INT NOT NULL FOREIGN KEY REFERENCES [dbo].[Products]([id]),

    -- Other fields
    [amount] INT NOT NULL
);