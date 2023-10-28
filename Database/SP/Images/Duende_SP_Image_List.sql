--------------------------------------------------------------------------
-- Author:      Fabián Vargas
-- Date:        23-10-11
-- Description: Retrieves a list of images.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Image_List]
    
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- VARIABLE DECLARATION
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);

    BEGIN TRY
        -- Retrieve the list of images
        SELECT 
            I.ID AS 'ImageID',
            C.Description AS 'Category',
            S.Description AS 'Subcategory',
            I.Name AS Name,
            I.Description AS Description,
            I.Date AS Date,
            COALESCE((
                SELECT STRING_AGG(description, ' ')
                FROM Tags
                WHERE ImageId = I.id
                AND Deleted = 0
            ), '') AS Tags,
            I.ImageURL AS URL
        FROM 
            Images I
            JOIN ImageSubcategories S ON I.subcategoryId = S.ID
            JOIN ImageCategories C ON S.categoryid = C.ID
        WHERE
            I.Deleted = 0

    END TRY
    BEGIN CATCH

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        IF @@TRANCOUNT > 0
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