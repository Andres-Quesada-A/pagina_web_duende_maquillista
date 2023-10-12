--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-11
-- Description: Modifies an image.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_Edit]
    @IN_ImageID INT,
    @IN_Subcategory VARCHAR(32),
    @IN_Category VARCHAR(32),
    @IN_Name VARCHAR(128),
    @IN_Description VARCHAR(1024),
    @IN_URL VARCHAR(256)
    
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

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
            FROM Category C
            WHERE C.Description = @IN_Category
            AND C.Deleted = 0
        )

        IF @Category IS NULL
        BEGIN
            RAISERROR('No Category was provided', 16, 1);
        END;

        -- Subcategory 

        SET @Subcategory = (SELECT S.ID 
            FROM Subcategory S
            WHERE S.Description = @IN_Subcategory
            AND S.categoryid = @Category
            AND C.Deleted = 0
        )

        IF @Subcategory IS NULL
        BEGIN
            RAISERROR('No subcategory was provided', 16, 1);
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
        IF LTRIM(RTRIM(@IN_URL)) = ''
        BEGIN
            RAISERROR('No URL was provided', 16, 1);
        END;

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        UPDATE Image
        SET subcategoryId = @Subcategory,
            name = @IN_Name,
            description = @IN_Description,
            imageURL = @IN_URL
        WHERE ID = @IN_ImageID
        AND Deleted = 0

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
            VALUES (
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