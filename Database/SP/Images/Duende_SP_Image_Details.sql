--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-22
-- Description: Returns the details of an image.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_Details]
    @IN_ImageID INT
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
    -- 

    BEGIN TRY

        -- VALIDATIONS
        IF NOT EXISTS
        (
            SELECT 1
            FROM Images I
            WHERE I.ID = @IN_ImageID
                AND I.Deleted = 0
        )
        BEGIN
            RAISERROR('The indicated image does not exist %d.', 16, 1, @IN_ImageID)
        END

        SELECT 
            I.ID as ImageID,
            I.Name as Name,
            I.Description AS Description,
            I.imageUrl as URL,
            C.Description AS Category,
            S.Description AS Subcategory,
            (
                SELECT STRING_AGG(description, '\n')
                FROM Tags
                WHERE ImageId = I.id
            ) AS Tags
        FROM Images I
        INNER JOIN ImageSubcategories S ON S.ID = I.SubcategoryID
        INNER JOIN ImageCategories C ON C.ID = S.CategoryID
        WHERE I.ID = @IN_ImageID
        AND I.Deleted = 0

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;

        --

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