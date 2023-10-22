--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-11
-- Description: Modifies an image.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_Edit]
    @IN_ImageID INT,
    @IN_ImageCategory VARCHAR(32),
    @IN_ImageSubcategory VARCHAR(32),
    @IN_Name VARCHAR(128),
    @IN_Description VARCHAR(1024),
    @IN_Tags TagsTVP READONLY,
    @IN_ImageUrl VARCHAR(256)

AS
BEGIN
    SET NOCOUNT ON;
    -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    DECLARE @Category INT = NULL;
    DECLARE @Subcategory INT= NULL;

    BEGIN TRY

        -- VALIDATIONS

        -- Verify exists
        IF NOT EXISTS(
            SELECT 1
    FROM Images I
    WHERE I.ID = @IN_ImageID
        AND I.Deleted = 0
                )
        BEGIN
        RAISERROR('The indicated image does not exist %d.', 16, 1, @IN_ImageID)
    END

        -- Category 
        SET @Category = (SELECT C.ID
    FROM ImageCategories C
    WHERE C.Description = @IN_ImageCategory
        AND C.Deleted = 0
        )

        IF @Category IS NULL
        BEGIN
        RAISERROR('No valid category was provided', 16, 1);
    END;

        -- Subcategory 

        SET @Subcategory = (SELECT S.ID
    FROM ImageSubcategories S
    WHERE S.Description = @IN_ImageSubcategory
        AND S.categoryid = @Category
        AND S.Deleted = 0
        )

        IF @Subcategory IS NULL
        BEGIN
        RAISERROR('No valid subcategory was provided', 16, 1);
    END;

        -- Name
        IF LTRIM(RTRIM(@IN_Name)) = ''
        BEGIN
        RAISERROR('No name was provided', 16, 1);
    END;

        -- Description
        IF LTRIM(RTRIM(@IN_Description)) = ''
        BEGIN
        RAISERROR('No description was provided', 16, 1);
    END;

        -- URL
        IF LTRIM(RTRIM(@IN_ImageUrl)) = ''
        BEGIN
        RAISERROR('No URL was provided', 16, 1);
    END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
        SET @transactionBegun = 1;
        BEGIN TRANSACTION;
    END;

        -- Update image
        UPDATE Images
        SET subcategoryId = @Subcategory,
            name = @IN_Name,
            description = @IN_Description,
            imageURL = @IN_ImageUrl
        WHERE ID = @IN_ImageID
        AND Deleted = 0

        INSERT INTO [dbo].[Tags] ([imageId], [description], [deleted])
        SELECT 
            @IN_ImageID AS [imageId], 
            NT.tags AS [description], 
            0 AS [deleted]
        FROM @IN_Tags AS NT
        WHERE NT.tags IS NOT NULL
        AND NT.tags NOT IN (
        SELECT [description] 
        FROM [dbo].[Tags] 
        WHERE [description] IS NOT NULL 
            AND imageId = @IN_ImageID 
            AND deleted = 0
        );
         
        UPDATE [dbo].[Tags]
        SET [deleted] = 1
        WHERE [description] NOT IN 
        (
            SELECT tags 
            FROM @IN_Tags 
            WHERE tags IS NOT NULL
        )
        AND [description] IS NOT NULL;


        



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