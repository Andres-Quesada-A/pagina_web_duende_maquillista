--------------------------------------------------------------------------
-- Author:      Paúl Rodríguez García
-- Date:        2023-10-11
-- Description: Returns the details for a single product.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[Duende_SP_Product_Details]
    -- Parameters
    @IN_id                  INT
AS
BEGIN
    SET NOCOUNT ON;         -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);

    BEGIN TRY

        -- VALIDATIONS
        IF NOT EXISTS(SELECT 1
                      FROM    [dbo].[Products] P
                      WHERE   P.[id] = @IN_id
                          AND P.[deleted] = 0)
        BEGIN
            RAISERROR('No existe el producto', 16, 1);
        END;

        SELECT  P.[id],
                PC.[description] AS 'category',
                P.[name],
                P.[description],
                P.[imageUrl],
                P.[price],
                P.[available]
        FROM    [dbo].[Products] P
        JOIN    [dbo].[ProductCategories] PC
            ON  P.[categoryId] = PC.[id]
        WHERE   P.[id] = @IN_id
                AND P.[deleted] = 0;

    END TRY
    BEGIN CATCH

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        RAISERROR('%s - Error Number: %i', 
            @ErrorSeverity, @ErrorState, @Message, @ErrorNumber);

    END CATCH;
END;