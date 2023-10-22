--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        2023-10-18
-- Description: Adds an image and associate it with a tag
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_Add]
    @IN_ImageCategory VARCHAR(32),
    @IN_ImageSubcategory VARCHAR(32),
    @IN_Name VARCHAR(128),
    @IN_Description VARCHAR(1024),
    @IN_ImageUrl VARCHAR(256),
    @IN_Tags TagsTVP READONLY

AS
BEGIN
    SET NOCOUNT ON;
    -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    DECLARE @ImageID INT;
    DECLARE @CategoryID INT = NULL;
    DECLARE @SubcategoryID INT = NULL;

    BEGIN TRY

        -- VALIDATIONS

        SET @CategoryID = 
        (
            SELECT id
            FROM ImageCategories
            WHERE description = @IN_ImageCategory
            AND deleted = 0
        );

        IF @CategoryID IS NULL
        BEGIN
        RAISERROR('Invalid Category', 16, 1);
    END;

        SET @SubcategoryID = 
        (
            SELECT id
            FROM ImageSubcategories
            WHERE description = @IN_ImageSubcategory 
            AND categoryId = @CategoryID
            AND deleted = 0
        );
        -- Verify if Subcategory exists
        IF @SubcategoryID IS NULL
    BEGIN
        RAISERROR('Invalid Subcategory ID', 16, 1);
    END;

        -- Verify Name is provided
        IF LTRIM(RTRIM(@IN_Name)) = ''
        BEGIN
        RAISERROR('No name was provided', 16, 1);
    END;

        -- Verify Description is provided
        IF LTRIM(RTRIM(@IN_Description)) = ''
        BEGIN
        RAISERROR('No description was provided', 16, 1);
    END;

        -- Verify ImageUrl is provided
        IF LTRIM(RTRIM(@IN_ImageUrl)) = ''
        BEGIN
        RAISERROR('No image URL was provided', 16, 1);
    END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
        SET @transactionBegun = 1;
        BEGIN TRANSACTION;
    END;

        -- Insert into Images
        INSERT INTO Images
        (subcategoryId, name, description, date, imageUrl, deleted)
    VALUES
        (@SubcategoryID, @IN_Name, @IN_Description, GETDATE(), @IN_ImageUrl, 0);

        SET @ImageID = SCOPE_IDENTITY();

        -- Insert tags from TVP into Tags table
        INSERT INTO Tags
        (imageId, description, deleted)
    SELECT @ImageID, tags, 0
    FROM @IN_Tags;

        -- TRANSACTION COMMITTED
        IF @transactionBegun = 1
        BEGIN
        COMMIT TRANSACTION;
    END;

    END TRY
    BEGIN CATCH

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        IF @transactionBegun = 1
        BEGIN
        ROLLBACK;
    END;

        IF @ErrorNumber != 50000
        BEGIN
        -- Non-custom errors are logged in the Errors table
        INSERT INTO [dbo].[Errors]
        VALUES
            (
                SUSER_NAME(),
                ERROR_NUMBER(),
                ERROR_STATE(),
                ERROR_SEVERITY(),
                ERROR_LINE(),
                ERROR_PROCEDURE(),
                ERROR_MESSAGE(),
                GETUTCDATE()
            );
    END;

        RAISERROR('%s - Error Number: %i', 
            @ErrorSeverity, @ErrorState, @Message, @ErrorNumber);

    END CATCH;
END;